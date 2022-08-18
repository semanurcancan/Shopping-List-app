import React, { Component, component } from "react";
import { FiTrash2, FiSave } from 'react-icons/fi';
import { AiOutlineStar } from "react-icons/ai";
import { VscGithubAlt } from "react-icons/vsc";
import { TbBrandLinkedin } from "react-icons/tb";

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.clearItems = this.clearItems.bind(this);
        this.addItems = this.addItems.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.addFrequetly = this.addFrequetly.bind(this)

        this.state = {
            items: ["Yogurt", "Bread", "Watermelon", "Smoke", "Meat"],
            freList: ["Apple", "Grape", "Water"]
        }
    }

    componentDidMount() {
        const json = localStorage.getItem('items');
        const items = JSON.parse(json);
        if (items) {
            this.setState({
                items: items
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.items.length !== this.state.items.length) {
            const json = JSON.stringify(this.state.items);
            localStorage.setItem('items', json);
        }
    }

    //listedeki ürünleri tek tek silen func
    deleteItem(item) {
        this.setState((prevState) => {
            const arr = prevState.items.filter((i) => {
                return item != i
            })
            return {
                items: arr,
                freList: prevState.freList
            }
        })
    }
    //listedeki tüm ürünleri silen func
    clearItems() {
        this.setState((prevState) => {
            return {
                items: [],
                freList: prevState.freList
            }
        });
    }
    //sık kullanılanların listeyen func.
    addFrequetly(item) {
        if (this.state.freList.indexOf(item) > -1) {
            return
        }
        this.setState((prevState) => {
            prevState.freList.push(item)
            return { items: prevState.items, freList: prevState.freList }
        });
    }
    //ürünleri ekleyen func
    addItems(item) {
        if (!item) {
            return <div className=" text-purple-500">Ürün eklemediniz</div>
                ;
        } else if (this.state.items.indexOf(item) > -1) {
            return <div className=" text-purple-500">Aynı Üründen Listede Mevcut</div>;
        }
        this.setState((prevState) => {
            return { items: prevState.items.concat(capitalizeFirstLetter(item)), freList: prevState.freList }
        });
    }

    //sepete konan ürünler için yapıldı işaretlemesi. ürünün üzerine tıklandığında üzeri çiziliyor.
    checked(el) {
        el.target.classList.toggle("strike-line")
    }


    render() {
        const app = {
            title: "SHOPPING LIST",
            description: "Reminder",
        }
        return (
            <div className=" grid justify-items-center font-dancing sm:grid grid-flow-row md:grid-flow-col  md:py-24 ">
                <div className="max-w-sm text-center  bg-pink-bej rounded-r-3xl rounded-3xl drop-shadow-4xl  px-24 py-5  m-7  ">
                    <div>
                        <Header title={app.title} description={app.description} />
                        <br></br>
                        <div className=" text-gray-700">
                            <TodoList items={this.state.items} deleteItem={this.deleteItem} clearItems={this.clearItems} addFrequetly={this.addFrequetly} checked={this.checked} />
                            <br></br>
                            <Action addItem={this.addItems} />
                        </div>
                    </div>
                    <br></br>
                    <div className=" text-gray-700">
                        <FrequentlyUsed addItem={this.addItems} frequetly={this.state.freList} addFrequetly={this.addFrequetly} />
                    </div>
                </div>

                <div className=" text-center self-center text-3xl  m-0.5 p-0.5">
                    <h1 className="font-bold">Shopping List</h1>
                    <h4 className="italic font-normal">Powered By Javascript, React, Tailwind</h4>
                    <br></br>
                    <h5 className="italic font-bold">Develop by Semanur CAN</h5>
                    <div className="flex justify-center" >
                        <a href="https://github.com/semanurcancan" > <VscGithubAlt /> </a>
                        <a href="https://www.linkedin.com/in/semanurcan/"> < TbBrandLinkedin />  </a>
                    </div>
                </div>

            </div>
        );
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const Header = (props) => {
    return (
        <div>
            <h1 className="text-xl  ">{props.title}</h1>
            <div className="text-l " >{props.description}</div>
        </div>

    );
}


//ürünler listeleniyor ve tüm listeyi temizleme butonu mevcut
const TodoList = (props) => {
    return (
        <div className="m-7 p-3 ">
            <ul>
                {
                    props.items.map((item, index) =>
                        <TodoItem deleteItem={props.deleteItem} addFrequetly={props.addFrequetly} key={index} item={item} checked={props.checked} />
                    )
                }
            </ul>

            <br></br>
            <hr>
            </hr>
            <br></br>

            <p>
                <button
                    className="bg-purple-300 hover:bg-purple-400 text-white font-normal p-2 border border-white-700 rounded-xl"
                    onClick={props.clearItems}>
                    Clear
                </button>
            </p>
        </div>
    )
}
<br>

</br>

//sık kullanılanlar listeleniyor ve alışveriş listesine ekleme butonu mevcut
const FrequentlyUsed = (props) => {

    return (
        <div className="flex-1 items-center justify-between">
            {props.frequetly.map((item, index) =>
                <div className="grid grid-cols-3" key={index}>
                    <span className="">{item}</span>
                    <br></br>

                    <button className="bg-purple-300 hover:bg-purple-400 text-white font-normal p-0.5 m-0.5 border border-white-400 rounded-xl " onClick={() => { props.addItem(item) }}> Add </button>

                </div>
            )}
        </div>

    )
}

//ürünleri listeleyip toDoList func. yolluyor.sık kullanılanlara ekle ve ürünü tek tek sil butonu mevcut.
const TodoItem = (props) => {

    return (
        <div className="grid grid-rows-1 grid-flow-col gap-1 rounded-3xl">

            <li className="text-left hover:-translate-y-1">
                <button onClick={() => { props.addFrequetly(props.item) }}><AiOutlineStar /> </button>
            </li>
            <li className="text-center " onClick={(el) => {
                props.checked(el)
            }}> {props.item}</li>

            <li className="text-right hover:-translate-y-1" >
                <button onClick={() => { props.deleteItem(props.item) }}> <FiTrash2 /> </button>
            </li>

        </div>


    );
}
<hr></hr>


//onsubmit işlemi gercekleşiyor.eklenecek ürün buradan listeye giriyor.ve 'add product' butonu burada.
class Action extends React.Component {
    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state = {
            error: ''
        }
    }
    onFormSubmit(e) {
        e.preventDefault();

        const item = e.target.elements.txtItem.value.trim();
        const error = this.props.addItem(item);
        this.setState({
            error: error
        })
        e.target.elements.txtItem.value = '';
    }


    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onFormSubmit}>
                    <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md  shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 " placeholder="What do you need..." type="text" name="txtItem" />
                   
                    <button
                        className="bg-purple-300 hover:bg-purple-400 p-2 m-2 text-white font-normal border border-white-700  rounded-xl"
                        type="submit">Add Product</button>
                </form>
            </div>
        );
    }
}




export default TodoApp


