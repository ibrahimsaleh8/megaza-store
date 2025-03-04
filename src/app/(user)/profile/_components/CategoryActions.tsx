import SmallLoader from "@/components/layoutComponts/Loader/SmallLoader";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MainDomain } from "@/utils/mainDomain";
import axios from "axios";
import { useRef, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
type Props = {
  id: number;
  token: string;
  type: "delete" | "add" | "edit";
  title?: string;
  products?: {
    id: string;
    title: string;
    card_image: string;
  }[];
};

async function DeleteCat(id: number, token: string) {
  await axios.delete(`${MainDomain}/api/category/${id}`, {
    headers: {
      token,
    },
  });
}
async function addCat(token: string, newCategory: string) {
  await axios.post(
    `${MainDomain}/api/category/getall`,
    { name: newCategory },
    {
      headers: {
        token,
      },
    }
  );
}

async function editCatFn(token: string, id: number, editCat: string) {
  await axios.put(
    `${MainDomain}/api/category/${id}`,
    { name: editCat },
    {
      headers: {
        token,
      },
    }
  );
}

export default function CategoryActions({
  id,
  token,
  type,
  title,
  products,
}: Props) {
  const [newCategory, setNewCategory] = useState("");
  const [editCat, setEditCat] = useState(title ? title : "");
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const queryClient = useQueryClient();
  // Delete Category
  const { mutate: DeleteCategory, isPending: loadingDelete } = useMutation({
    mutationFn: (data: { id: number; token: string }) =>
      DeleteCat(data.id, data.token),
    onSuccess: () => {
      toast.success("Category Deleted Success");
      closeRef.current?.click();
      queryClient.refetchQueries({
        queryKey: ["categories"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // Add Category
  const { mutate: addNewCat, isPending: loadingAdd } = useMutation({
    mutationFn: (data: { token: string; newCategory: string }) =>
      addCat(data.token, data.newCategory),
    onSuccess: () => {
      toast.success("Category Added Success");
      closeRef.current?.click();
      queryClient.refetchQueries({
        queryKey: ["categories"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // Edit Category
  const { mutate: editCategory, isPending: loadingEdit } = useMutation({
    mutationFn: (data: { token: string; id: number; editCat: string }) =>
      editCatFn(data.token, data.id, data.editCat),
    onSuccess: () => {
      toast.success("Category Updated Success");
      closeRef.current?.click();
      queryClient.refetchQueries({
        queryKey: ["categories"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const AddNewCategory = () => {
    if (newCategory.trim().length <= 0) {
      toast.error("Please Write category title");
      return;
    }
    addNewCat({ newCategory, token });
  };

  const EditCategory = () => {
    if (editCat.trim().length <= 0) {
      toast.error("Please Write category title");
      return;
    }
    editCategory({ editCat, id, token });
  };

  return (
    <div>
      <AlertDialog>
        {type == "delete" && (
          <AlertDialogTrigger className="flex items-center py-1 w-8 justify-center bg-red-500 hover:bg-red-600 h-9 gap-2 text-sm font-medium text-white rounded-md">
            <MdDelete className="w-5 h-5" />
          </AlertDialogTrigger>
        )}

        {type == "add" && (
          <AlertDialogTrigger className="flex items-center gap-2 px-4 text-sm font-medium py-2 bg-black text-white rounded-md">
            <IoMdAdd />
            New Category
          </AlertDialogTrigger>
        )}

        {type == "edit" && (
          <AlertDialogTrigger className="flex items-center gap-2 px-4 text-sm font-medium py-1.5 bg-[#23b0ff] text-white rounded-md">
            <FiEdit3 />
            Edit
          </AlertDialogTrigger>
        )}

        <AlertDialogContent className="bg-white gap-2 text-black">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {type == "delete" && <> Will you Delete this category ?</>}
              {type == "add" && <> Add New Category</>}
              {type == "edit" && <> Edit Category</>}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {type == "delete" && (
                <>
                  This action cannot be undone. This will permanently delete
                  this category from our servers.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {type == "add" && (
            <div>
              <label
                htmlFor="add-cat"
                className="text-sm mb-1 block font-medium">
                Category Title
              </label>
              <Input
                required
                onChange={(e) => setNewCategory(e.target.value)}
                type="text"
                id="add-cat"
                placeholder="Category Title"
              />
            </div>
          )}

          {type == "edit" && (
            <div>
              <label
                htmlFor="Edit-cat"
                className="text-sm mb-1 block font-medium">
                Category Title
              </label>
              <Input
                defaultValue={editCat}
                required
                onChange={(e) => setEditCat(e.target.value)}
                type="text"
                id="Edit-cat"
                placeholder="Category Title"
              />
              {products && products.length > 0 && (
                <Accordion type="single" collapsible>
                  <AccordionItem
                    className="max-h-56 overflow-y-auto"
                    value="item-1">
                    <AccordionTrigger>
                      Products ( {products?.length} )
                    </AccordionTrigger>
                    {products.map((pr) => (
                      <AccordionContent
                        className="flex p-1 my-1 gap-2 items-center bg-[#ececec] text-black border rounded-sm w-full"
                        key={pr.id}>
                        <img
                          className="w-16 rounded-lg"
                          src={pr.card_image}
                          alt={pr.title}
                        />
                        <Link
                          href={`/profile/admin/edit-product/${pr.id}`}
                          className="line-clamp-1 text-sm font-medium hover:underline">
                          {pr.title}
                        </Link>
                      </AccordionContent>
                    ))}
                  </AccordionItem>
                </Accordion>
              )}
            </div>
          )}

          <AlertDialogFooter className="mt-3">
            <AlertDialogCancel
              ref={closeRef}
              className="absolute p-1 w-6 h-6 rounded-full top-1 border-red-500 right-1 bg-red-500 hover:bg-red-500 text-white hover:text-white">
              <IoMdClose />
            </AlertDialogCancel>
            {type == "delete" && (
              <Button
                onClick={() => DeleteCategory({ id, token })}
                disabled={loadingDelete}>
                {loadingDelete ? (
                  <>
                    <SmallLoader color="white" />
                  </>
                ) : (
                  <>
                    <MdDelete />
                    Delete
                  </>
                )}
              </Button>
            )}
            {type == "add" && (
              <Button
                className="bg-green-700 hover:bg-success_green"
                disabled={loadingAdd}
                onClick={AddNewCategory}>
                {loadingAdd ? (
                  <>
                    <SmallLoader color="white" />
                  </>
                ) : (
                  <>Add</>
                )}
              </Button>
            )}
            {type == "edit" && (
              <Button
                className="bg-green-700 hover:bg-success_green"
                disabled={loadingEdit}
                onClick={EditCategory}>
                {loadingEdit ? (
                  <>
                    <SmallLoader color="white" />
                  </>
                ) : (
                  <>Save</>
                )}
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
