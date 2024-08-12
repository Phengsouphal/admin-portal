export interface IProduct {
  categoryId: string
  collectionIds: string[]
  description: string
  variants: IProductVariant[]
}

export interface IProductItemList {
  variants: IProductVariantsList[]
  product: {
    category: ICateItem
    categoryId: string
    collectionIds: string[]
    collections: ICollectionList[]
    createdAt: string
    description: string
    discountRate: number
    discount: number
    discountType: DiscountEnum
    price: number
    orderCount: number
    soldCount: number
    storeId: string
    _id: string
  }
}

export interface IProductVariantsList {
  createdAt: string
  description: string
  isDeleted: boolean
  mediaIds: string[]
  medias: IImageData[]
  name: string
  price: number
  productId: string
  updatedAt: string
  _id: string
}

export interface IProductVariant {
  name: string
  price: number
  description: string
  mediaIds: string[]
}

export interface ICategoryData {
  name: string
  description: string
  imageId: string
}

export interface ICategoryListData {
  category: ICateItem
  productCount: number
}

export interface ICollectionListData {
  collection: ICollectionList
  productCount: number
}

export interface ICateItem {
  storeId: string
  _id: string
  imageId: string
  name: string
  description: string
  image: IImageData
}

export interface IImageData {
  fileName: string
  fileType: string
  url: string
  _id: string
}

export interface ICollectionData {
  name: string
  description: string
}

export interface ICollectionList {
  _id: string
  name: string
  description: string
  storeId: string
  status: 'ACTIVE' | 'INACTIVE'
  isDefault: boolean
}

export interface IMeta {
  currentPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
  itemCount: number
  itemsPerPage: number
  nextPage?: any
  prevPage?: any
  totalItems: number
  totalPages: number
}

export interface ICustomer {
  createdAt: string
  deleted: boolean
  fullName: string
  id: string
  isDeleted: boolean
  userId: string
  phoneNumber: string
  updatedAt: string
  _id: string
  avatarUrl: string
}

export interface IOrderItemList {
  items: {
    categoryId: string
    createdAt: string
    deleted: boolean
    discountAmount: 22
    id: string
    orderId: string
    originalPrice: 23
    product: IProduct
    productId: string
    productVariant: IProductVariant
    productVariantId: string
    productVariantName: string
    qty: number
    storeId: string
    total: number
    unitPrice: number
    updatedAt: string
  }[]
  order: {
    addressId: string
    addressName: string
    contactName: string
    createdAt: string
    currency: string
    customer: ICustomer
    customerId: string
    deleted: boolean
    deliveryFee: number
    discountTotal: number
    id: string
    lat: number
    lng: number
    note: string
    phoneNumber: string
    status: string
    storeId: string
    subTotal: number
    total: number
    updatedAt: string
    voucher?: any
  }
}

export interface ICustomerListData {
  createdAt: string
  customer: ICustomer
  customerId: string
  deleted: boolean
  id: string
  isBanned: boolean
  orderCount: number
  storeId: string
  updatedAt: string
  _id: string
}

export interface IUserData {
  deleted: boolean
  isStoreOwner: boolean
  _id: string
  isDeleted: boolean
  status: StatusEnum
  fullName: string
  phoneCountryCode: string
  phoneLineNumber: string
  phoneNumber: string
  password: string
  createdAt: string
  updatedAt: string
  storeId: string
  roleId: string
  id: string
}

export interface IRoleData {
  _id: string
  deleted: boolean
  name: string
  appType: string
  permissions: string[]
  isDefault: boolean
  createdAt: string
  updatedAt: string
  storeId: string
}

export interface IStore {
  logoId: string
  logo?: {
    createdAt: string
    deleted: boolean
    fileName: string
    fileType: string
    updatedAt: string
    url: string
    _id: string
  }
  name: string
  description: string
  email: string
  phoneNumber: string
  address: string
  currency: CurrencyEnum
  minOrderAmount: number
  deliveryFee: number
  isAutoConfirmOrder: boolean
  walletName: string
  walletAddress: string
  openStatus: OpenStatusEnum
  tempCloseStart: string
  tempCloseEnd: string
  openFromDay: string
  openToDay: string
  openFromHour: string
  openToHour: string
}

export interface IRolePermissionData {
  module: string
  permissions: IPermission[]
}

export interface IPermission {
  key: string
  name: string
}

export interface IProfile {
  isStoreOwner: boolean
  status: StatusEnum
  _id: string
  isDeleted: boolean
  fullName: string
  password?: string
  phoneNumber: string
  createdAt: string
  updatedAt: string
  storeId: string
  roleId: string
  avatarUrl: string
  id: string
}

export interface IVoucherListData {
  code: string
  key: string
  createdAt: string
  deleted: boolean
  description: string
  discount: 10
  discountType: DiscountEnum
  endAt: string
  id: string
  maxUseLimit: number | null
  minPurchaseAmount: number
  name: string
  publishMode: PublicModeEnum
  publishTo: PublicToEnum
  startAt: string
  status: StatusEnum
  storeId: string
  type: VoucherTypeEnum
  updatedAt: string
  usageLimit: UsageLimitEnum
  _id: string
}

export interface IVoucherCreateData {
  customerIds: string[]
  name: string
  description: string
  code: string
  type: VoucherTypeEnum
  discount: number | null
  discountType: DiscountEnum | string
  minPurchaseAmount: number | null
  startAt: string
  endAt: string
  publishTo: PublicToEnum | string
  publishMode: PublicModeEnum | string
  maxUseLimit: number | null
  usageLimit: UsageLimitEnum | string
}

export interface IDiscountCreateData {
  productIds: string[]
  name: string
  description: string
  type: DiscountTypeEnum | string
  value: number | null
  valueType: DiscountEnum | string
  startAt: string
  endAt: string
  publishTo: PublicToEnum | string
  maxUseLimit: number | null
  usageLimit: UsageLimitEnum.LIMITED | UsageLimitEnum.UNLIMITED | string
  applyTo: ApplyToEnum | string
}

export interface IDiscountListData {
  applyTo: ApplyToEnum | string
  createdAt: string
  key: string
  description: string
  endAt: string
  id: string
  maxUseLimit: number | null
  name: string
  productIds: string[]
  publishTo: PublicToEnum | string
  startAt: string
  status: StatusEnum
  storeId: string
  type: DiscountTypeEnum
  updatedAt: string
  usageLimit: UsageLimitEnum.LIMITED | UsageLimitEnum.UNLIMITED | string
  value: number | null
  valueType: DiscountEnum | string
  _id: string
}

export enum ApplyToEnum {
  ALL = 'ALL',
  SPECIFIC = 'SPECIFIC'
}

export enum DiscountTypeEnum {
  PRODUCT_DISCOUNT = 'PRODUCT_DISCOUNT'
  // FEE_SHIPPING = 'FEE_SHIPPING'
}

export enum VoucherTypeEnum {
  DISCOUNT = 'DISCOUNT',
  FEE_SHIPPING = 'FEE_SHIPPING'
}

export enum UsageLimitEnum {
  UNLIMITED = 'UNLIMITED',
  LIMITED = 'LIMITED',
  ONE_PER_CUSTOMER = 'ONE_PER_CUSTOMER'
}

export enum PublicModeEnum {
  NORMAL = 'NORMAL',
  CLAIM = 'CLAIM'
}

export enum PublicToEnum {
  ALL_CUSTOMER = 'ALL_CUSTOMER',
  NEW_CUSTOMER = 'NEW_CUSTOMER',
  OLD_CUSTOMER = 'OLD_CUSTOMER',
  SPECIFIC_CUSTOMER = 'SPECIFIC_CUSTOMER'
}

export enum DayEnum {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY'
}

export enum OpenStatusEnum {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
  TEMPORARY_CLOSE = 'TEMPORARY_CLOSE'
}

export enum CurrencyEnum {
  USD = 'USD',
  KHR = 'KHR',
  YUAN = 'YUAN'
}

export enum StatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export enum OrderStatusEnum {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  REJECTED = 'REJECTED',
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export enum DiscountEnum {
  AMOUNT = 'AMOUNT',
  PERCENTAGE = 'PERCENTAGE'
}
