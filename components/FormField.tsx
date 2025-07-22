// components/CustomFormField.tsx
import React from 'react';
import { Controller } from "react-hook-form";
import {
    FormControl,
    FormDescription,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const CustomFormField = ({ control, name, label, placeholder }: {
    control: any;
    name: string;
    label: string;
    placeholder: string;
}) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormDescription>This is your public display name.</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default CustomFormField;
