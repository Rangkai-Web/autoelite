import { ref } from "vue";

const isOpen = ref(false);
const prefilledVehicleId = ref("");
const prefilledVariantId = ref<number | null>(null);
const prefilledColor = ref<string | null>(null);

export function usePurchaseModal() {
  const openModal = (
    vehicleId: string = "",
    variantId: number | null = null,
    color: string | null = null
  ) => {
    prefilledVehicleId.value = vehicleId;
    prefilledVariantId.value = variantId;
    prefilledColor.value = color;
    isOpen.value = true;
  };

  const closeModal = () => {
    isOpen.value = false;
    prefilledVehicleId.value = "";
    prefilledVariantId.value = null;
    prefilledColor.value = null;
  };

  return {
    isOpen,
    prefilledVehicleId,
    prefilledVariantId,
    prefilledColor,
    openModal,
    closeModal,
  };
}
