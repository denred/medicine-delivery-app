import { type Order } from '../products/libs/types/types.js';
import { type OrderRepository } from './order.repository.js';

class OrderService {
  private orderRepository: OrderRepository;

  public constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  public async create(payload: Order): Promise<{
    orderId: number;
    orderItemIds: number[];
  }> {
    const { customerInfo, order } = payload;

    const orderId = await this.orderRepository.insertOrder(customerInfo);
    const orderItems = order.map(({ id, quantity }) => ({
      orderId,
      productId: id,
      quantity,
    }));
    const orderItemIds =
      await this.orderRepository.insertOrderItems(orderItems);

    return { orderId, orderItemIds };
  }
}

export { OrderService };
