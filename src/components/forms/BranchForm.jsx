import { Form, Input, Select, Switch } from "antd";
import React from "react";
import AddressForm from "./AddressForm";

const { Option } = Select;
const { TextArea } = Input;

const BranchForm = ({ form }) => {
  return (
    <>
      {/* Branch Code & Name */}
      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          name="branchCode"
          label={
            <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">
              Branch Code
            </span>
          }
          rules={[{ required: true, message: "Required" }]}
          className="mb-4"
        >
          <Input
            placeholder="BR001"
            className="h-9 text-sm border-gray-200 hover:border-black focus:border-black focus:shadow-none"
          />
        </Form.Item>
        <Form.Item
          name="branchName"
          label={
            <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">
              Branch Name
            </span>
          }
          rules={[{ required: true, message: "Required" }]}
          className="mb-4"
        >
          <Input
            placeholder="Metro Manila Branch"
            className="h-9 text-sm border-gray-200 hover:border-black focus:border-black focus:shadow-none"
          />
        </Form.Item>
      </div>

      {/* Address */}
      <Form.Item
        name="address"
        label={
          <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">
            Address
          </span>
        }
        rules={[{ required: true, message: "Required" }]}
        className="mb-4"
      >
        <TextArea
          rows={2}
          placeholder="Complete address"
          className="text-sm border-gray-200 hover:border-black focus:border-black focus:shadow-none resize-none"
        />
      </Form.Item>

      {/* City & Region */}
      {/* <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="city"
              label={
                <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                  City
                </span>
              }
              rules={[{ required: true, message: "Required" }]}
              className="mb-4"
            >
              <Input
                placeholder="Manila"
                className="h-9 text-sm border-gray-200 hover:border-black focus:border-black focus:shadow-none"
              />
            </Form.Item>
            <Form.Item
              name="region"
              label={
                <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                  Region
                </span>
              }
              rules={[{ required: true, message: "Required" }]}
              className="mb-4"
            >
              <Select
                placeholder="Select region"
                className="text-sm"
                style={{ height: "36px" }}
              >
                <Option value="NCR">NCR</Option>
                <Option value="Region I">Region I</Option>
                <Option value="Region IV-A">Region IV-A</Option>
                <Option value="Region II">Region II</Option>
                <Option value="Region III">Region III</Option>
              </Select>
            </Form.Item>
          </div> */}

      <AddressForm form={form} />

      {/* Contact Number & Email */}
      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          name="contactNumber"
          label={
            <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">
              Contact Number
            </span>
          }
          className="mb-4"
        >
          <Input
            placeholder="+63 2 1234 5678"
            className="h-9 text-sm border-gray-200 hover:border-black focus:border-black focus:shadow-none"
          />
        </Form.Item>
        <Form.Item
          name="email"
          label={
            <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">
              Email
            </span>
          }
          className="mb-4"
        >
          <Input
            type="email"
            placeholder="branch@hotel.com"
            className="h-9 text-sm border-gray-200 hover:border-black focus:border-black focus:shadow-none"
          />
        </Form.Item>
      </div>

      {/* Operating Hours & Status */}
      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          name="operatingHours"
          label={
            <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">
              Operating Hours
            </span>
          }
          className="mb-4"
        >
          <Input
            placeholder="24/7"
            className="h-9 text-sm border-gray-200 hover:border-black focus:border-black focus:shadow-none"
          />
        </Form.Item>
        <div className="flex flex-col space-y-2">
          <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">
            Status
          </span>

          <Form.Item name="isActive" valuePropName="checked" className="mt-4">
            <div className="flex items-center  pt-3 pl-2">
              <p className="text-xs text-gray-500 pr-2">"Branch is: </p>
              <Switch
                size="default"
                checkedChildren="Active"
                unCheckedChildren="Inactive"
              />
            </div>
          </Form.Item>
        </div>
      </div>

      {/* Amenities */}
      <Form.Item
        name="amenities"
        label={
          <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">
            Amenities
          </span>
        }
        className="mb-6"
      >
        <Select
          mode="tags"
          placeholder="Add amenities"
          tokenSeparators={[","]}
          className="text-sm"
        >
          <Option value="WiFi">WiFi</Option>
          <Option value="Parking">Parking</Option>
          <Option value="Restaurant">Restaurant</Option>
          <Option value="Pool">Pool</Option>
          <Option value="Gym">Gym</Option>
          <Option value="Spa">Spa</Option>
          <Option value="Conference Room">Conference Room</Option>
          <Option value="Business Center">Business Center</Option>
        </Select>
      </Form.Item>
    </>
  );
};

export default BranchForm;
