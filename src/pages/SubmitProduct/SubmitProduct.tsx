import { useState, useEffect } from "react";
import { Button, Form, Input, InputNumber, Select, FormProps } from "antd";
import { BASE_URL } from "../../utils/urls";
import H2 from "../../components/H2";
import { useLocation, useNavigate } from "react-router-dom";
import { useNotification } from "../../utils/hooks";

const { Option } = Select;

type FieldType = {
    title?: string;
    price?: number;
    description?: string;
    image?: string;
    category?: string;
};

const SubmitProduct = () => {
    const [submittable, setSubmittable] = useState<boolean>(false);
    const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
    const [categories, setCategoies] = useState<string[]>();
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

    const [form] = Form.useForm();
    const values = Form.useWatch([], form);

    const { state } = useLocation();

    const navigate = useNavigate();

    const { notify, contextHolder } = useNotification();

    useEffect(() => {
        fetchCategories();
        if (state) form.setFieldsValue(state);
        else form.resetFields();
    }, [state]);

    useEffect(() => {
        form.validateFields({ validateOnly: true })
            .then(() => setSubmittable(true))
            .catch(() => setSubmittable(false));
    }, [form, values]);

    const fetchCategories = async () => {
        setLoadingCategories(true);

        try {
            const response = await fetch(`${BASE_URL}products/categories`);
            const categories: string[] = await response.json();
            if (categories?.length) {
                setCategoies(categories);
            }
        } catch (e: any) {
            console.log("Error fetching categories", e);
        } finally {
            setLoadingCategories(false);
        }
    };

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        setLoadingSubmit(true);
        try {
            let url = `${BASE_URL}products`;
            if (state) url += `/${state.id}`;

            let response = await fetch(url, {
                method: state ? "PUT" : "POST",
                body: JSON.stringify(values),
            });
            if (response.ok) {
                const title = `${state ? "Update" : "Add"} a product`;
                const description = `Product has been ${state ? "updated" : "added"} successfully!`;

                notify("success", title, description);
                setTimeout(() => navigate("/home"), 2000);
            }
        } catch (e: any) {
            console.log(`Failed to ${state ? "update" : "add"} product`, e);
            notify("error", `Failed to ${state ? "update" : "add"} product`, e?.message);
        } finally {
            setLoadingSubmit(false);
        }
    };

    return (
        <>
            <H2>{state ? "Update the" : "Add a"} Product</H2>
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
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={!submittable}
                            loading={loadingSubmit}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default SubmitProduct;
