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
      <FormControl sx={{marginRight: '2rem', backgroundColor: 'white'}} fullWidth>
        <InputLabel id="demo-customized-select-label">Resekategori</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
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
