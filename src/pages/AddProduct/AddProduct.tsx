import { useState, useEffect } from "react";
import { Button, Form, Input, InputNumber, Select, FormProps, notification } from "antd";
import { BASE_URL } from "../../utils/urls";
import H2 from "../../components/H2";

const { Option } = Select;

type FieldType = {
    title?: string;
    price?: number;
    description?: string;
    image?: string;
    category?: string;
};

type NotificationType = "success" | "info" | "warning" | "error";

const AddProduct = () => {
    const [submittable, setSubmittable] = useState<boolean>(false);
    const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
    const [categories, setCategoies] = useState<string[]>();

    const [form] = Form.useForm();
    const values = Form.useWatch([], form);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoadingCategories(true);

        try {
            const response = await fetch(`${BASE_URL}products/categories`);
            const categories: string[] = await response.json();
            if (categories?.length) {
                setCategoies(categories);
            }
        } catch (e: any) {
            console.log(e);
        } finally {
            setLoadingCategories(false);
        }
    };

    useEffect(() => {
        form.validateFields({ validateOnly: true })
            .then(() => setSubmittable(true))
            .catch(() => setSubmittable(false));
    }, [form, values]);

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        try {
            let response = await fetch(`${BASE_URL}products`, {
                method: "POST",
                body: JSON.stringify(values),
            });
            if (response.ok)
                notify("success", "Add a product", "New product has been added successfully!");
        } catch (e: any) {
            console.log(e);
            notify("error", "Failed to add product", e?.message);
        }
    };

    const [api, contextHolder] = notification.useNotification();

    const notify = (type: NotificationType, message: string, description: string) => {
        api[type]({
            message,
            description,
        });
    };

    return (
        <>
            <H2>Add a Product</H2>
            <div className="w-full flex justify-center">
                {contextHolder}
                <Form
                    form={form}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 800, width: "100%" }}
                    onFinish={onFinish}
                    size="large"
                    requiredMark="optional"
                >
                    <Form.Item<FieldType>
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: "Please enter a title!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: "Please enter a price!" }]}
                    >
                        <InputNumber addonAfter="$" min={1} className="w-full" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: "Please enter a description!" }]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Image"
                        name="image"
                        rules={[
                            { required: true, message: "Please enter an image url!" },
                            { type: "url", message: "Please input a valid url!" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="category"
                        label="Category"
                        rules={[{ required: true, message: "Please select a category!" }]}
                    >
                        <Select placeholder="Select a category" loading={loadingCategories}>
                            {categories?.map((category, index) => (
                                <Option value={category} key={index}>
                                    {category.toUpperCase()}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" disabled={!submittable}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default AddProduct;
