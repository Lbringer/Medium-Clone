import React from "react";
type InputFormProps = {
  label: string;
  placeholder: string;
  typeOfInput?: string;
  onChange: (e: any) => void;
};

export const InputForm: React.FC<InputFormProps> = ({
  label,
  placeholder,
  typeOfInput,
  onChange,
}) => {
  return (
    <div className="flex flex-col w-1/2 text-sm">
      <label className="mb-2 font-medium" htmlFor={label}>
        {label}
      </label>
      <input
        className="border border-stone-200 rounded bg-stone-50 focus:outline-none px-5 py-3 mb-4"
        type={typeOfInput || "text"}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
