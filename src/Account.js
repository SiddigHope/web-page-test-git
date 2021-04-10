import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input, Button } from 'antd';
import { makeStyles, Typography } from '@material-ui/core';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const useStyle = makeStyles(() => ({
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: '#e3e3e3',
        marginRight: 20,
        marginLeft: 20,
        borderRadius: 30,
        boxShadow: '1px 3px .05px #4444',
        padding: 20
    },
    formDiv: {
        width: '50%',
        padding: 20
    },
    form: {
    },
    data: {
        width: '50%',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
    },
    text: {
        alignSelf: 'flex-start',
        fontSize: 20
    }
}))


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}


const Account = () => {
    const [form] = Form.useForm();
    const classes = useStyle()
    const [formLayout] = useState('horizontal');
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png");


    const handleChange = info => {
        console.log(info.file)
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                setImageUrl(imageUrl),
                setLoading(false)
            );
        }
    };



    const handleSubmit = values => {
        console.log(String(values))
    }

    const today = new Date()

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <>
            <Typography className={classes.text}>
                Last Login: {today.toUTCString()}
            </Typography>
            <div className={classes.container}>
                <div className={classes.formDiv}>
                    <Form
                        className={classes.form}
                        layout={formLayout}
                        form={form}
                        initialValues={{
                            layout: formLayout,
                        }}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        <Form.Item>
                            <Input placeholder="Type your username" />
                        </Form.Item>
                        <Form.Item>
                            <Input type='password' placeholder="Type your old password here" />
                        </Form.Item>
                        <Form.Item>
                            <Input type='password' placeholder="Type your New password here" />
                        </Form.Item>
                        <Form.Item>
                            <Input type='password' placeholder="Type your New password again" />
                        </Form.Item>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}

                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                        <Form.Item >
                            <Button type="primary">Update Account</Button>
                        </Form.Item>
                    </Form>

                </div>
            </div>
        </>
    );
};

export default Account