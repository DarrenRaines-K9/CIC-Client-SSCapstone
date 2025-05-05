import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/router";
import { getInventory } from "@/data/inventory";
import { PlusCircle } from "lucide-react";

export default function Inventory() {
  const router = useRouter();
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Loading Events...");

  useEffect(() => {
    getInventory()
      .then((response) => {
        // The response had no errors
        if (response) {
          setInventory(response);
          setIsLoading(false);
        } else {
          // Handle non-200 responses
          setLoadingMessage(`Error loading events: Status ${response.status}`);
        }
      })
      .catch((error) => {
        // The response had errors
        setLoadingMessage(`Error loading events: ${error.message}`);
        setIsLoading(false); // Set isLoading to false even in error case
      });
  }, []);


  const handleCreateInventory = () => {
    router.push("/inventory/new");
  };

  if (isLoading) {
    return <p>{loadingMessage}</p>;
  }

  // Check if events exists AND has length
  if (!inventory || inventory.length === 0) {
    return <p>No events found.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      <div className="grid grid-cols-1 gap-4">
        <Card
          className="w-[350px] border-dashed cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={handleCreateInventory}
        >
          <CardContent className="flex flex-col items-center justify-center py-8">
            <PlusCircle className="h-12 w-12 text-gray-400 mb-2" />
            <p className="text-lg font-medium">Create New Inventory</p>
            <p className="text-sm text-gray-500">Click to add a new inventory</p>
          </CardContent>
        </Card>       
        {inventory.map((inventory) => (
          <Card key={inventory.id} className="w-[350px]">
            <CardHeader>
              <CardTitle>{inventory.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{inventory.description}</p>
              <p>Quantity: {inventory.quantity}</p>
              <p>Cost: {inventory.cost}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => router.push(`/inventory/${inventory.id}`)}>
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
