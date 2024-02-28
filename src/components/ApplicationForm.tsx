import React, { useState } from 'react'
import { Button, Checkbox, Form, Input, Switch, Radio, Space, ConfigProvider } from 'antd';
import skills from '../data/skills.json'
import './ApplicationForm.scss'

type ApplicationFormProps = {
  firstName: string,
  isProficient: boolean,
  toolsUsed: string
}

export const ApplicationForm: React.FC<ApplicationFormProps>= ({firstName, isProficient, toolsUsed}: ApplicationFormProps) => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const toolsUsedArr = toolsUsed.split(",").map(x=>parseInt(x))
  const onFinish = (values: any) => {
    values.toolsUsed = values.toolsUsedArr.join(",")
    delete values.toolsUsedArr
    console.log('Success:', values);
  };
  const onFinishFailed = ({ values, errorFields}: any) => {
    console.error(`Fail: ${values}, errorFields: ${errorFields}`)
  }
  return (
    <>
      <div className="shadow-md p-8 pb-2 rounded-xl bg-white application-form">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#7c3aed',
            },
            components:{
              Button:{
                contentFontSize: 12
              },
              Radio:{
                dotSize: 0,
              },
              Switch:{
                handleSize: 14,
                trackHeight: 24,
                trackMinWidth: 50,
                trackPadding: 5
              }
            }
          }}
        >
          <div className="flex">
            <div>Editable</div>
            <Switch 
              className="ml-auto" 
              defaultChecked 
              checked={!componentDisabled}
              onChange={(e) => {setComponentDisabled(!e)}}
            />
          </div>
          <Form
            name="application_form" 
            layout="vertical" className="mt-4" 
            disabled={componentDisabled}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{ firstName, isProficient, toolsUsedArr }}
          >
            <Form.Item name="firstName">
              <div>
                <Input
                  type="text" 
                  id="firstName" 
                  className="pb-1.2 pt-5 peer"
                  placeholder=''
                  defaultValue={firstName}
                />
                <label htmlFor="firstName" className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3">
                    First Name
                </label>
              </div>
            </Form.Item>
            <Form.Item
              name="isProficient"
              label={<label className="font-bold text-lg">Are you proficient in ReactJS developement?</label>}>
                <Radio.Group className="mt-2">
                  <Space direction="vertical">
                    <Radio value={false}>No</Radio>
                    <Radio value={true}>Yes</Radio>
                  </Space>
                </Radio.Group>
            </Form.Item>
            <Form.Item name="toolsUsedArr" label={
              <label>
                <div className="font-bold text-lg">Which tools do you use?</div>
                <div className='text-zinc-500'>Please select all that apply.</div>  
              </label>
            }>
                <Checkbox.Group className="mt-3">
                  <Space direction="vertical">
                    {
                      skills.map(skill => <Checkbox value={skill.id} key={skill.id}>{skill.name}</Checkbox>)
                    }
                  </Space>
                </Checkbox.Group>
            </Form.Item>
            <Form.Item className="flex justify-center mt-10">
              <Button id="btn-process" type="primary" shape="round" className="bg-violet-600 text-white h-10" htmlType="submit">
                <div className="px-5 tracking-widest">Process</div>
              </Button>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>
    </>
  )
}



