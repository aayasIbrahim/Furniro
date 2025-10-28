"use client";
import React, { FC, ChangeEvent } from "react";

export type FormDataType = {
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

type BillingFormProps = {
  formData: FormDataType;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
};

type FormFieldProps = {
  label: string;
  name: keyof FormDataType;
  type?: string;
  optional?: boolean;
  children?: React.ReactNode;
  placeholder?: string;
};

export const BillingForm: FC<BillingFormProps> = ({ formData, handleChange }) => {
  const INPUT_CLASS =
    "w-full p-3 border border-gray-300 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#B88E2F]/50 transition-colors";

  const FormField: FC<FormFieldProps> = ({ label, name, type = "text", optional = false, children, placeholder = "" }) => (
    <div className="mb-6">
      <label htmlFor={name} className="block text-gray-700 font-medium mb-2 text-sm">
        {label} {optional && <span className="text-gray-500 text-xs">(Optional)</span>}
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
    <div>
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-1">
          <FormField label="First Name" name="firstName" placeholder="Your First Name" />
        </div>
        <div className="flex-1">
          <FormField label="Last Name" name="lastName" placeholder="Your Last Name" />
        </div>
      </div>

      <FormField label="Company Name" name="companyName" optional placeholder="Your Company Name" />

      <FormField label="Country / Region" name="country">
        <select id="country" name="country" value={formData.country} onChange={handleChange} className={INPUT_CLASS}>
          <option value="Sri Lanka">Sri Lanka</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
        </select>
      </FormField>

      <FormField label="Street Address" name="streetAddress" placeholder="123 Main Street" />

      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-1">
          <FormField label="Town / City" name="townCity" placeholder="Colombo" />
        </div>
        <div className="flex-1">
          <FormField label="Province" name="province">
            <select id="province" name="province" value={formData.province} onChange={handleChange} className={INPUT_CLASS}>
              <option value="Western">Western Province</option>
              <option value="Central">Central Province</option>
              <option value="Southern">Southern Province</option>
            </select>
          </FormField>
        </div>
      </div>

      <FormField label="ZIP Code" name="zipCode" placeholder="00100" />
      <FormField label="Phone" name="phone" type="tel" placeholder="+94 77 123 4567" />
      <FormField label="Email address" name="email" type="email" placeholder="example@email.com" />

      <FormField label="Additional Information" name="additionalInfo" optional>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          rows={3}
          placeholder="Notes about your order, e.g. special delivery instructions."
          className={INPUT_CLASS}
        />
      </FormField>
    </div>
  );
};
