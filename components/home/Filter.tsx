import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Link_type } from "../../shared/types";
import { useForm, Controller } from "react-hook-form";
import { useFilter } from "../../shared/store";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  link_types: Link_type[];
};

const Filter = ({ link_types }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { query: "", type: 0 },
    mode: "onChange",
  });
  const addFilter = useFilter((store) => store.addFilter);
  const clearFilter = useFilter((store) => store.clearFilter);
  const qc = useQueryClient();

  const filterHandler = (values: any) => {
    addFilter({ query: values.query, type: values.type });
    qc.invalidateQueries(["links"]);
  };

  const clearHandler = () => {
    clearFilter();
    reset();
    qc.invalidateQueries(["links"]);
  };

  return (
    <Box py={4}>
      <form onSubmit={handleSubmit(filterHandler)}>
        <Box
          sx={{
            flexDirection: { xs: "column", md: "row" },
            alignItems: { md: "center" },
            gap: { xs: 4, md: 0 },
          }}
          display="flex"
        >
          <Box
            sx={{
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
            }}
            display="flex"
            flex={1}
          >
            <TextField
              id="query"
              label="search"
              type="text"
              placeholder="search by title or url"
              variant="standard"
              error={!!errors?.query}
              sx={{ width: { md: "40%" } }}
              {...register("query", {
                maxLength: 80,
              })}
            />
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  variant="standard"
                  sx={{ width: { md: "15%" } }}
                >
                  <InputLabel id="type_select">Type</InputLabel>
                  <Select
                    labelId="type_select"
                    id="type_select1"
                    label="type"
                    {...field}
                  >
                    <MenuItem value={0}>All</MenuItem>
                    {link_types.map((t) => (
                      <MenuItem key={t.id} value={t.id}>
                        {t.id === 1 ? " 😊" : t.id === 2 ? "😢" : t.type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Box>
          <Box>
            <Button
              sx={{
                width: { xs: "100%", md: "auto" },
                mb: { xs: "1rem", md: 0 },
                mr: { md: "1rem" },
              }}
              type="submit"
              variant="outlined"
            >
              Search
            </Button>
            <Button
              sx={{ width: { xs: "100%", md: "auto" } }}
              variant="outlined"
              onClick={clearHandler}
            >
              RESET
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Filter;
