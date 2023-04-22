import { FC, InputHTMLAttributes } from "react";

interface inputType extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: FC<inputType> = (props) => {
  const { placeholder, label } = props;
  return (
    <div className="form-control w-full min-w-xs">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input className="input input-bordered w-full rounded-3xl" {...props} />
    </div>
  );
};

export const InputForm: FC<inputType> = (props) => {
  const { placeholder, label } = props;
  return (
    <div className="form-control w-full min-w-xs">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input className="input input-bordered w-full rounded-xl" {...props} />
    </div>
  );
};
