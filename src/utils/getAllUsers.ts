import getAllActiveUsers from "@/requests/get-all-active";
import getAllInactiveUsers from "@/requests/get-all-inactive";

export default function getAllUsers(): void {
  console.log("getAllUsers called");
  getAllActiveUsers();
  getAllInactiveUsers();
}
