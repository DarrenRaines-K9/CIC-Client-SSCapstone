"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addInventory } from "@/data/inventory";

export default function NewInventory() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    quantity: 0,
    description: "",
    cost: 0,
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["quantity", "cost"].includes(name)
        ? value === ""
          ? ""
          : parseFloat(value)
        : value,
    }));
  };
  //   const handleFormChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]:
  //         name === "quantity" ||
  //         name === "name" ||
  //         name === "description" ||
  //         name === "cost"
  //           ? parseFloat(value)
  //           : value,
  //     }));
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await addInventory(formData);
      if (response) {
        router.push("/inventory");
      } else {
        setErrorMessage("Error creating inventory item.");
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage(`Error creating inventory item: ${error.message}`);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/inventory");
  };

  return (
    <div className="flex w-full flex-col items-center justify-center m-10">
      <h1 className="text-2xl font-bold mb-4">Add Inventory Item</h1>

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full max-w-md">
          {errorMessage}
        </div>
      )}

      <Card className="w-[850px]">
        <CardHeader>
          <CardTitle>Inventory Details</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4 py-2">
            <div className="grid gap-2">
              <label htmlFor="name">Name</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
                placeholder="Item name"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                required
                placeholder="Item description"
                rows={4}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="quantity">Quantity</label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleFormChange}
                  required
                  min="0"
                />
              </div>
              <div>
                <label htmlFor="cost">Cost</label>
                <Input
                  id="cost"
                  name="cost"
                  type="number"
                  value={formData.cost}
                  onChange={handleFormChange}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Add Inventory"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
