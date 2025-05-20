
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOrder } from '@/contexts/OrderContext';
import RequireAuth from '@/components/RequireAuth';

const OrderStatusBadge = ({ status }) => {
  const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    processing: 'bg-blue-100 text-blue-800 border-blue-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
  };
  
  return (
    <Badge variant="outline" className={`${statusStyles[status]} capitalize`}>
      {status}
    </Badge>
  );
};

const Orders = () => {
  const { getUserOrders } = useOrder();
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'processing' | 'completed' | 'cancelled'>('all');
  
  const orders = getUserOrders();
  
  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);
  
  return (
    <RequireAuth>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-4">No orders yet</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't placed any orders yet</p>
            <Link to="/menu">
              <Button className="bg-food hover:bg-food-dark">Browse Menu</Button>
            </Link>
          </div>
        ) : (
          <>
            <Tabs value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>
              
              <TabsContent value={filterStatus}>
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No {filterStatus !== 'all' ? filterStatus : ''} orders found</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredOrders.map(order => (
                      <Card key={order.id}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                          <CardTitle className="text-lg font-medium">Order #{order.id}</CardTitle>
                          <OrderStatusBadge status={order.status} />
                        </CardHeader>
                        <CardContent>
                          <div className="mb-4">
                            <p className="text-sm text-gray-500">
                              Ordered on {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                            <p className="font-medium">
                              Total: ${order.total.toFixed(2)}
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>
                                  {item.quantity} x {item.name}
                                </span>
                                <span className="text-gray-700">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <Link to={`/order-confirmation/${order.id}`}>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </RequireAuth>
  );
};

export default Orders;
