export type CreateOrderResponse = {
  orderId: string;
  status: "pending";
  estimatedMinutes: number;
};

export async function createOrder(): Promise<CreateOrderResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    orderId: "ORD-001",
    status: "pending",
    estimatedMinutes: 15,
  };
}