import { Input, Table, Space, Popconfirm } from 'antd'
import axios from 'axios'
import React from 'react'
import { Input, List, Space, Table, Popconfirm } from 'antd';
import axios from 'axios';
import './App.css'
import { findAllByAltText } from '@testing-library/react';

const { Search } = Input;

class App extends React.Component {
  state = {
    list: [],
    columns: [
      {
        title: '任务编号',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '任务名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '任务描述',
        dataIndex: 'des',
        key: 'des',
      },
      {
        title: '操作',
        dataIndex: 'do',
        key: 'do',
        render(_, record) {
          <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
            <a>Delete</a>
          </Popconfirm>
        }
      },
    ]
  }

  // 搜索
  onSearch = async (value) => {

    const res = await axios.get(`http://localhost:3001/data/?q=${value}`)
    this.setState({
      list: res.data

    })
  }
  // 删除
  handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/data/${id}`)
    this.loadList()
  }
  // 加载列表
  loadList = async () => {
    const res = await axios.get('http://localhost:3001/data')
    console.log(res)
    this.setState({
      list: res.data
    })
  }
  componentDidMount() {
    // 发送接口请求
    this.loadList()
  }
  render() {
    return (
      <div className="container">
        <div className="search-box">
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={this.onSearch}
          />
        </div>
        <Table dataSource={this.state.list} columns={this.state.columns} />
      </div>
    )
  }
}

export default App
