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
export const TravelSelect = ({
    companies = ['Soloresa', 'Familjeresa', 'Parresa', 'Kompisresa'],
    onChange = () => {
      console.log("company changed");
    },
    value = "",
  }) => {
    const companyMenuItems = companies.map((item, key) => (
      <MenuItem key={`company-${key}`} value={item}>
        {item}
      </MenuItem>
    ));
  
    return (
      <FormControl fullWidth>
        <InputLabel id="simple-select-label">Resesällskap</InputLabel>
        <Select
          labelId="simple-select-label"
          value={value}
          label="Company"
          variant="filled"
          onChange={(e) => {
            onChange(e);
          }}
        >
          {companies && companyMenuItems}
        </Select>
      </FormControl>
    );
  };
