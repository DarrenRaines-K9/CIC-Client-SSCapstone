"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  getInventoryById,
  deleteInventory,
  editInventory,
} from "@/data/inventory";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function InventoryDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [inventoryItem, setInventoryItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState(
    "Loading Inventory Item..."
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Form state for editing
  const [editFormData, setEditFormData] = useState({
    name: "",
    quantity: 0,
    description: "",
    cost: 0,
  });

  useEffect(() => {
    if (id) {
      loadInventoryItem();
    }
  }, [id]);

  const loadInventoryItem = () => {
    getInventoryById(id)
      .then((response) => {
        if (response) {
          setInventoryItem(response);
          // Initialize form data with inventory item data
          setEditFormData({
            name: response.name,
            quantity: response.quantity,
            description: response.description,
            cost: response.cost,
          });
          setIsLoading(false);
        } else {
          setLoadingMessage(`Error loading inventory item: Item not found`);
        }
      })
      .catch((error) => {
        setLoadingMessage(`Error loading inventory item: ${error.message}`);
        setIsLoading(false);
      });
  };

  const handleDeleteInventory = () => {
    setIsLoading(true);
    setLoadingMessage("Deleting inventory item...");

    deleteInventory(id)
      .then(() => {
        router.push("/inventory");
      })
      .catch((error) => {
        setLoadingMessage(`Error deleting inventory item: ${error.message}`);
        setIsLoading(false);
      });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: ["quantity", "cost"].includes(name)
        ? value === ""
          ? ""
          : parseFloat(value)
        : value,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingMessage("Updating inventory item...");

    editInventory(id, editFormData)
      .then(() => {
        loadInventoryItem(); // Reload the inventory item after edit
      })
      .catch((error) => {
        setLoadingMessage(`Error updating inventory item: ${error.message}`);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <p className="text-center py-8">{loadingMessage}</p>;
  }

  if (!inventoryItem) {
    return <p className="text-center py-8">No inventory item found.</p>;
  }

  return (
    <div className="flex  w-full flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory Item Details</h1>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{inventoryItem.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Description:</span>{" "}
              {inventoryItem.description}
            </p>
            <p>
              <span className="font-semibold">Quantity:</span>{" "}
              {inventoryItem.quantity}
            </p>
            <p>
              <span className="font-semibold">Cost:</span> $
              {parseInt(inventoryItem.cost).toFixed(2)}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/inventory")}>
            Back to Inventory
          </Button>
          <div className="space-x-2">
            {/* Edit Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Inventory Item</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleEditSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="name">Name</label>
                      <Input
                        id="name"
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditFormChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="description">Description</label>
                      <textarea
                        id="description"
                        name="description"
                        value={editFormData.description}
                        onChange={handleEditFormChange}
                        required
                        className="border border-gray-300 rounded-md p-2 w-full"
                        rows={4}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label htmlFor="quantity">Quantity</label>
                        <Input
                          id="quantity"
                          name="quantity"
                          type="number"
                          value={editFormData.quantity}
                          onChange={handleEditFormChange}
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
                          value={editFormData.cost}
                          onChange={handleEditFormChange}
                          required
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit" onClick={handleEditSubmit}>
                      Save Changes
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            {/* Delete Button */}
            <Button
              variant="destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              Delete
            </Button>

            {/* Delete Confirmation Dialog */}
            <AlertDialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the inventory item.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteInventory}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
