import { ref } from "vue";

const isOpen = ref(false);
const prefilledVehicleId = ref("");

export function usePurchaseModal() {
  const openModal = (vehicleId: string = "") => {
    prefilledVehicleId.value = vehicleId;
    isOpen.value = true;
  };

  const closeModal = () => {
    isOpen.value = false;
    prefilledVehicleId.value = "";
  };

  return {
    isOpen,
    prefilledVehicleId,
    openModal,
    closeModal,
  };
}
