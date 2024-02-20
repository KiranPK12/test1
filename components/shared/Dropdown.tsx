"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Doc } from "@/convex/_generated/dataModel";
import { startTransition, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";

interface DropDownProps {
  value?: string;
  onChangeHandler?: () => void;
}
const Dropdown = ({ value, onChangeHandler }: DropDownProps) => {
  const createCategories = useMutation(api.category.createCategory);
  const categoriesList = useQuery(api.category.getAllCategories);

  const [categories, setCategories] = useState<Doc<"category">[]>([]);
  const [newCategory, setNewCategory] = useState("");


  const handleAddCategory = async () => {
    createCategories({
      name: newCategory.trim(),
    })
      .then((category) =>
        setCategories((prevState) => [...prevState, category!])
      )
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    categoriesList && setCategories(categoriesList as Doc<"category">[]);
  }, [categoriesList]);

  if (categoriesList === undefined) {
    return <Loader2 />;
  } else {
    return (
      <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="gap-y-4">
          {categories.map((category) => (
            <SelectItem
              key={category._id}
              value={category._id}
              className="py-3 cursor-pointer focus:bg-primary-50 p-regular-14"
            >
              {category.name}
            </SelectItem>
          ))}
          <AlertDialog>
            <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
              Add Category
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>New Category</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input
                    type="text"
                    required
                    placeholder="Category Name"
                    className="mt-3 bg-grey-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 rounded-md p-regular-16 px-4 py-3 border-none "
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleAddCategory()}>
                  Add
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SelectContent>
      </Select>
    );
  }
};

export default Dropdown;
