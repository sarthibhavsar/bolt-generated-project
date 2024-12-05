import { Input } from "@/components/ui/input";
import { PropTypes } from "prop-types";

export const CustomInput = ({
  type = "",
  placeholder = "",
  id = "",
  ...rest
}) => {
  return (
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...rest}
        autoComplete='off'
      />
  );
};

CustomInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.any,
};
