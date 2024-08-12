export default class RouteName {
  static HOME_NOTICE = 'home-notice'
  static HOME = 'home'
  static SETUP_STORE = 'setup-store'

  static CHANGE_PASSWORD = 'change-password'
  static LOGIN = 'login'
  static RESET_NEW_PASSWORD = 'reset-new-password'
  static PROFILE = 'profile'

  static CATEGORY = 'category'
  static ADD_CATEGORY = 'add-category'
  static EDIT_CATEGORY = 'edit-category'

  static PRODUCT = 'product'
  static ADD_PRODUCT = 'add-product'
  static EDIT_PRODUCT = 'edit-product'
  static PRODUCT_DETAIL = 'product-detail'

  static COLLECTION = 'collection'
  static ADD_COLLECTION = 'add-collection'

  static CONFIRM_ORDER = 'confirm-order'
  static ORDER_HISTORY = 'order-history'
  static ORDER_DETAIL = 'order-detail'

  static PRODUCT_REPORT = 'product-report'
  static ORDER_REPORT = 'order-report'

  static CUSTOMER_LIST = 'customer-list'
  static CUSTOMER_DETAIL = 'customer-detail'
  static BLOCKED_CUSTOMER = 'blocked-customer'

  static REPORT = 'report'

  static DISCOUNT = 'discount'
  static ADD_DISCOUNT = 'add-discount'
  static EDIT_DISCOUNT = 'edit-discount'
  static DISCOUNT_DETAIL = 'discount-detail'

  static VOUCHER = 'voucher'
  static ADD_VOUCHER = 'add-voucher'
  static EDIT_VOUCHER = 'edit-voucher'
  static VOUCHER_DETAIL = 'voucher-detail'

  static PROMOTION = 'promotion'

  static STORE_SETTING = 'store-setting'
  static ACCOUNT_SETTING = 'account-setting'
  static USER = 'user'
  static ADD_USER = 'add-user'
  static ROLE = 'role'
  static ADD_ROLE = 'add-role'
  static EDIT_ROLE = 'edit-role'
}

const menuData = (t: any) => [
  {
    id: '001',
    name: t('nav.home'),
    icon: 'fa-solid fa-home',
    routeName: RouteName.HOME,
    isAdmin: false
  },

  {
    id: '002',
    isAdmin: false,
    name: t('nav.legalDocument'),
    icon: 'fa-solid fa-scale-balanced',
    routeName: RouteName.CHANGE_PASSWORD
  }
]

export { menuData }
