"use client"
import React, { useState, ChangeEvent, FormEvent, FC } from "react";

type FormDataType = {
  firstName: string;
  lastName: string;
  companyName: string;
  country: string;
  streetAddress: string;
  townCity: string;
  province: string;
  zipCode: string;
  phone: string;
  email: string;
  additionalInfo: string;
  paymentMethod: "directBankTransfer" | "cashOnDelivery" | "anotherMethod";
};

type OrderItem = {
  name: string;
  quantity: number;
  subtotal: number;
};

type OrderSummaryType = {
  items: OrderItem[];
  subtotal: number;
  total: number;
};

type FormFieldProps = {
  label: string;
  name: keyof FormDataType;
  type?: string;
  optional?: boolean;
  children?: React.ReactNode;
  placeholder?: string;
};

const CheckoutPage: FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "Sri Lanka",
    streetAddress: "",
    townCity: "",
    province: "Western",
    zipCode: "",
    phone: "",
    email: "",
    additionalInfo: "",
    paymentMethod: "directBankTransfer",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Order Placed! (Check console for submitted data)");
  };

  const orderSummary: OrderSummaryType = {
    items: [{ name: "Asgaard sofa", quantity: 1, subtotal: 250000.0 }],
    subtotal: 250000.0,
    total: 250000.0,
  };

  const formatPrice = (price: number) =>
    `Rs. ${price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

  const ACCENT_COLOR_HEX = "#B88E2F";
  const ACCENT_TEXT = "text-[#B88E2F]";
  const BG_LIGHT = "bg-[#FCF8F3]";
  const INPUT_CLASS =
    "w-full p-3 border border-gray-300 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#B88E2F]/50 transition-colors";

  const FormField: FC<FormFieldProps> = ({
    label,
    name,
    type = "text",
    optional = false,
    children,
    placeholder = "",
  }) => (
    <div className="mb-6">
      <label
        htmlFor={name}
        className="block text-gray-700 font-medium mb-2 text-sm"
      >
        {label}{" "}
        {optional && (
          <span className="text-gray-500 text-xs">(Optional)</span>
        )}
      </label>
      {children ? (
        children
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={formData[name] as string}
          onChange={handleChange}
          className={INPUT_CLASS}
          placeholder={placeholder}
        />
      )}
    </div>
  );

  return (
    <div className="py-12 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto font-sans  mt-[100px]">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Checkout</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12">
        {/* Left Column */}
        <div className="lg:w-3/5">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Billing details
          </h2>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <FormField label="First Name" name="firstName" placeholder="Your First Name" />
            </div>
            <div className="flex-1">
              <FormField label="Last Name" name="lastName" placeholder="Your Last Name" />
            </div>
          </div>

          <FormField
            label="Company Name"
            name="companyName"
            optional
            placeholder="Your Company Name"
          />

          <FormField label="Country / Region" name="country">
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={INPUT_CLASS}
            >
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
            </select>
          </FormField>

          <FormField
            label="Street Address"
            name="streetAddress"
            placeholder="123 Main Street"
          />

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <FormField
                label="Town / City"
                name="townCity"
                placeholder="Colombo"
              />
            </div>
            <div className="flex-1">
              <FormField label="Province" name="province">
                <select
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className={INPUT_CLASS}
                >
                  <option value="Western">Western Province</option>
                  <option value="Central">Central Province</option>
                  <option value="Southern">Southern Province</option>
                </select>
              </FormField>
            </div>
          </div>

          <FormField label="ZIP Code" name="zipCode" placeholder="00100" />
          <FormField
            label="Phone"
            name="phone"
            type="tel"
            placeholder="+94 77 123 4567"
          />
          <FormField
            label="Email address"
            name="email"
            type="email"
            placeholder="example@email.com"
          />

          <FormField
            label="Additional Information"
            name="additionalInfo"
            optional
          >
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows={3}
              placeholder="Notes about your order, e.g. special delivery instructions."
              className={INPUT_CLASS}
            ></textarea>
          </FormField>
        </div>

        {/* Right Column */}
        <div
          className={`lg:w-2/5 mt-12 lg:mt-0 p-8 rounded-xl ${BG_LIGHT} shadow-lg h-fit`}
        >
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Your Order</h3>

          <div className="mb-8">
            <div className="flex justify-between font-bold border-b border-gray-400 pb-3 mb-4 text-gray-800">
              <span className="text-lg">Product</span>
              <span className="text-lg">Subtotal</span>
            </div>

            {orderSummary.items.map((item, index) => (
              <div key={index} className="flex justify-between text-gray-600 mb-2">
                <span className="font-medium">
                  {item.name} x {item.quantity}
                </span>
                <span className="text-gray-500">
                  {formatPrice(item.subtotal)}
                </span>
              </div>
            ))}

            <div className="flex justify-between pt-4 border-t border-gray-300 mt-4">
              <span className="text-lg text-gray-600">Subtotal</span>
              <span className="text-lg text-gray-700">
                {formatPrice(orderSummary.subtotal)}
              </span>
            </div>

            <div className="flex justify-between pt-2">
              <span className="text-xl font-bold">Total</span>
              <span className={`text-2xl font-bold ${ACCENT_TEXT}`}>
                {formatPrice(orderSummary.total)}
              </span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-8 pt-4">
            <div className="mb-4">
              <label className="flex items-center text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="directBankTransfer"
                  checked={formData.paymentMethod === "directBankTransfer"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 border-gray-400 text-[#B88E2F] focus:ring-0 focus:ring-offset-0"
                />
                <span className="ml-2 font-semibold">Direct Bank Transfer</span>
              </label>
              {formData.paymentMethod === "directBankTransfer" && (
                <p className="text-sm text-gray-500 mt-2 ml-6">
                  Make your payment directly into our bank account. Please use
                  your Order ID as the payment reference. Your order will not be
                  shipped until the funds have cleared in our account.
                </p>
              )}
            </div>

            <div className="mb-2">
              <label className="flex items-center text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cashOnDelivery"
                  checked={formData.paymentMethod === "cashOnDelivery"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 border-gray-400 text-[#B88E2F] focus:ring-0 focus:ring-offset-0"
                />
                <span className="ml-2">Cash On Delivery</span>
              </label>
            </div>

            <div className="mb-2">
              <label className="flex items-center text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="anotherMethod"
                  checked={formData.paymentMethod === "anotherMethod"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 border-gray-400 text-[#B88E2F] focus:ring-0 focus:ring-offset-0"
                />
                <span className="ml-2">Another Payment Method</span>
              </label>
            </div>

            <p className="text-xs text-gray-500 mt-6 leading-relaxed">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our{" "}
              <a
                href="#"
                className={`font-semibold underline ${ACCENT_TEXT}`}
              >
                privacy policy
              </a>
              .
            </p>

            <button
              type="submit"
              className={`w-full md:w-auto mt-8 py-3 px-12 border-2 border-transparent ${ACCENT_TEXT} rounded-lg font-semibold transition-all duration-300 hover:bg-[#B88E2F] hover:text-white hover:border-[#B88E2F]`}
              style={{ borderColor: ACCENT_COLOR_HEX }}
            >
              Place order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
