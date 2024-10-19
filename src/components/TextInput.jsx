import PropTypes from "prop-types";

const TextInput = ({ placeholder, type, field, id, register }) => {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        placeholder=" "
        className="form-input peer bg-black px-2.5 pt-4 outline
                      outline-blue-100/40 focus:outline-color-1
                      focus:placeholder-color-1 focus:outline-2 outline-1
                      rounded-sm w-[300px] h-[56px] transition-all"
        {...register(field)}
        required
      />
      <label
        htmlFor={id}
        className="absolute left-16 top-2 text-gray-500 transition-all
                      duration-200 ease-in-out peer-placeholder-shown:top-[30%]
                      peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                      peer-focus:top-[12%] peer-focus:text-xs peer-focus:text-color-1
                      select-none peer-valid:top-[12%] peer-valid:text-xs hover:cursor-text"
      >
        {placeholder}
      </label>
    </div>
  );
};

TextInput.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  field: PropTypes.string,
  id: PropTypes.string,
  register: PropTypes.object
}

export default TextInput;
