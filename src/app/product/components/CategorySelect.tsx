import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useCategory } from "../contexts/useCategory";

type Props = {
    value: string;
    onChange: (e: SelectChangeEvent) => void;
};

export default function CategorySelect({ value, onChange }: Props) {
    const { categories } = useCategory();

    return (
        <FormControl>
            <InputLabel id="catSelect">Category</InputLabel>
            <Select
                id="catSelect"
                value={value}
                labelId="Category"
                label="Category"
                onChange={onChange}
            >
                {categories?.map((cat) => {
                    return (
                        <MenuItem key={cat.uuid} value={cat.uuid}>
                            {cat.name}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}
