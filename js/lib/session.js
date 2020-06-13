const PRESET_USERS = [
  {
    'email': 'ichiro@example.com',
    'password': 'password',
    'username': '山田一郎',
    'rank': 'premium',
    'address': '東京都豊島区池袋',
    'tel': '01234567891',
    'gender': '1',
    'birthday': '',
    'notification': true,
  },
  {
    'email': 'sakura@example.com',
    'password': 'pass1234',
    'username': '松本さくら',
    'rank': 'normal',
    'address': '神奈川県横浜市鶴見区大黒ふ頭',
    'tel': '',
    'gender': '2',
    'birthday': '2000-04-01',
    'notification': false,
  },
  {
    'email': 'jun@example.com',
    'password': 'pa55w0rd!',
    'username': '林潤',
    'rank': 'premium',
    'address': '大阪府大阪市北区梅田',
    'tel': '01212341234',
    'gender': '9',
    'birthday': '1988-12-17',
    'notification': false,
  },
  {
    'email': 'yoshiki@example.com',
    'password': 'pass-pass',
    'username': '木村良樹',
    'rank': 'normal',
    'address': '',
    'tel': '01298765432',
    'gender': '0',
    'birthday': '1992-08-31',
    'notification': true,
  },
];

/**
 * Get user data
 * @param {string} email
 * @return {object} user data
 */
export function getUser(email) {
  let user = PRESET_USERS.find((val) => val.email === email);
  if (user) {
    user.preset = true;
    return user;
  }
  user = localStorage.getItem(email);
  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
}

/**
 * check valid user
 * @param {string} email
 * @param {string} password
 * @return {boolean} return true if valid user
 */
export function isValidUser(email, password) {
  const user = getUser(email);
  return (user && user.password === password);
}

/**
 * Get session user
 * @return {string} session user email
 */
export function getSessionUser() {
  return document.cookie.replace(/(?:(?:^|.*;\s*)session\s*\=\s*([^;]*).*$)|^.*$/, '$1');
}

/**
 * login
 * @param {string} email
 */
export function login(email) {
  document.cookie = `session=${email}; max-age=630720000`;
}

/**
 * logout
 */
export function logout() {
  document.cookie = 'session=; max-age=0';
}

/**
 * Generate transaction ID
 * @return {string}
 */
export function genTransactionId() {
  return `${Math.floor(Math.random() * (10000000000 - 1000000000)) + 1000000000}`;
}

/**
 * Get transaction ID from session
 * @return {string}
 */
export function getTransactionId() {
  return document.cookie.replace(/(?:(?:^|.*;\s*)transaction\s*\=\s*([^;]*).*$)|^.*$/, '$1');
}

/**
 * delete transaction ID
 */
export function deleteTransactionId() {
  document.cookie = 'transaction=; max-age=0';
}

/**
 * Set login status to navbar
 */
export function setLoginNavbar() {
  document.getElementById('signup-holder').classList.replace('d-block', 'd-none');
  document.getElementById('login-holder').classList.replace('d-block', 'd-none');
  document.getElementById('mypage-holder').classList.replace('d-none', 'd-block');
  document.getElementById('logout-holder').classList.replace('d-none', 'd-block');
  document.getElementById('logout-form').addEventListener('submit', () => {
    logout();
  });
}

/**
 * Check display by user
 * @param {object} plan
 * @param {object} user
 * @return {boolean} true if can display
 */
export function canDisplayPlan(plan, user) {
  if (!plan.only) {
    return true;
  }
  if (!user) {
    return false;
  }
  if (plan.only === 'member') {
    return true;
  } else if (plan.only === 'premium') {
    return (user.rank === 'premium');
  }
}
