import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

/**
 *
 * @categories {Array} and array of categories from the database
 * @onChange {Function} a function that runs onChange
 * @value {string} Your current value
 */
export const CategorySelect = ({
    categories = [],
    onChange = () => {
      console.log("category changed");
    },
    value = "",
  }) => {
    const categoryMenuItems = categories.map((item, key) => (
      <MenuItem key={`category-${key}`} value={item.category}>
        {item.category}
      </MenuItem>
    ));
  
    return (
      <FormControl fullWidth>
        <InputLabel id="simple-select-label">Category</InputLabel>
        <Select
          labelId="simple-select-label"
          value={value}
          label="Category"
          variant="filled"
          onChange={(e) => {
            onChange(e);
          }}
        >
          {categories && categoryMenuItems}
        </Select>
      </FormControl>
    );
  };
