export type CouponCode = {
    id: number;
    code: string;
    discount: number; // Discount percentage
    percentage: boolean; // Whether the discount is a percentage or a fixed amount
    minPurchase?: number; // Minimum purchase amount to apply the coupon
    expiryDate?: Date; // Expiry date of the coupon
    isActive: boolean; // Whether the coupon is currently active
}