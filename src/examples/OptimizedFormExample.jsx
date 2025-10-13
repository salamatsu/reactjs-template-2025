import { Form, Input, Button, message } from "antd";
import { useState } from "react";
import { cn } from "../utils/cn";
import { loginSchema } from "../schemas";
import { validateFormWithZod } from "../utils/zodValidator";
import { useSocket } from "../contexts/SocketContext";

/**
 * Example component demonstrating all optimization features:
 * 1. Zod validation
 * 2. clsx for dynamic classes
 * 3. Socket.IO integration
 * 4. Error handling
 */
const OptimizedFormExample = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { emit, isConnected } = useSocket();

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      // Validate with Zod
      const validatedData = await validateFormWithZod(loginSchema, values);

      // Emit via Socket.IO if connected
      if (isConnected) {
        emit("login-attempt", validatedData);
      }

      // Process your form data here
      console.log("Validated data:", validatedData);
      message.success("Form submitted successfully!");

      // Reset form
      form.resetFields();
    } catch (error) {
      // Handle validation errors
      if (error.errorFields) {
        form.setFields(error.errorFields);
        message.error("Please check the form for errors");
      } else {
        message.error("An error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Optimized Form Example</h2>

      {/* Socket Connection Status */}
      <div
        className={cn(
          "mb-4 p-3 rounded-lg text-sm",
          isConnected
            ? "bg-green-50 text-green-800 border border-green-200"
            : "bg-yellow-50 text-yellow-800 border border-yellow-200"
        )}
      >
        Socket.IO: {isConnected ? "Connected ✓" : "Disconnected ✗"}
      </div>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Invalid email format" },
          ]}
        >
          <Input placeholder="your@email.com" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Password is required" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input.Password placeholder="••••••••" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            className={cn("w-full", isSubmitting && "opacity-70")}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Form.Item>
      </Form>

      {/* Usage Examples */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Features Used:</h3>
        <ul className="text-sm space-y-1 text-gray-600">
          <li>✓ Zod schema validation</li>
          <li>✓ clsx for conditional styling</li>
          <li>✓ Socket.IO real-time connection</li>
          <li>✓ Ant Design form integration</li>
          <li>✓ Error boundary protection</li>
        </ul>
      </div>
    </div>
  );
};

export default OptimizedFormExample;
