import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    CardFooter,
    Table,
    Row,
    Col
  } from "reactstrap";
  
import axios from "axios";
import { element } from "prop-types";
import PageComp from '../../components/PageComp/PageComp';
// const ListItem = ({value}) => {
//     <li>{value}</li>
// };
// const List = ({items})=>{
//     <ul>
//        {
//         items.map((item)=>{
//             <ListItem value={item}/>
//         }) 
//        }
//     </ul>
// }

class MyView extends React.Component {

    
    constructor(props) {
        super(props);
        this.fetchSomeData=this.fetchSomeData.bind(this);
        this.fetchListOfData=this.fetchListOfData.bind(this);
        this.state = {
            buildNumber:props.buildNumber,
            dataList: [],
            totalReusltsPerPage:[],
            TotalResultsDevidedByPages:[],
            currentPage:[],
            tableHeaders:[],
            totalPages:0
        }
            this.changePage = this.changePage.bind(this);
      }


    render() {
      return (
        <div className="content">
        <Row>
          <Col md={12}>
          <h1>
              Hello World!
          </h1>
          <h2>
              {this.state.buildNumber}
          </h2>
          <button onClick={this.fetchSomeData}>
              Click me!
          </button>
          <button onClick={this.fetchListOfData}>
              Click me2!
          </button>
          <div>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Simple Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                    <thead>
                        <tr>
                           {
                            this.state.tableHeaders.map((prop,key)=>{
                                return(<th key={key}>{prop}</th>)
                            })
                            }
                        </tr>
                    </thead>
                  <tbody>
                    {this.state.currentPage.map((prop, key) => {
                      return (
                        <tr key={key}>
                          {
                              Object.keys(prop).map((key)=>{
                                return (<td key={key}>{prop[key]}</td>)
                              })
                          }   
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
          </Col>
          <Row>
              total of {this.state.dataList.length} tests<br/>
              thare are total of {this.state.totalPages} pages <br/>
              {
                  this.state.TotalResultsDevidedByPages.map((prop, key,index)=>{
                      return(
                      
                        <a href="javascript:void(0);" key={key} onClick={()=>this.changePage(key)} >{key+1} | </a>
        
                      
                      )
                  })
              }
          </Row>
          <Row>
          {
                  this.state.TotalResultsDevidedByPages.map((prop, key,index)=>{
                      return(    
                     <span>  <PageComp key={key} changePage={()=>this.changePage(key)} page={key+1}/></span> 
                      )
                  })
              }
          </Row>
          </div>
          </Col>
        </Row>
      </div>
      
     )
    }

    fetchSomeData(){
        axios.get('http://localhost:3001/jobs/buildVerNum')
        .then((results)=>{
           
            this.setState({
                buildNumber:results.data.data
            })
        })
        .catch((error)=>{
            console.log(error);
        })
    }



    fetchListOfData(){
        axios.get('http://localhost:3001/jobs/globlInfPromise')
        .then(results=>{
           
            this.setState({
                dataList:results.data.data.data
            });
            if(this.state.dataList.length>10){
               // console.log(this.state.dataList.length/10)
                this.setState({
                    totalPages:this.state.dataList.length/10
                })
                //var totalPages=this.state.dataList.length/10;
                 var totalReusltsPerPage=[];
                var localTotalResultsDevidedByPages=[];
                for(let i=0;i<this.state.dataList.length;i=i+10){
                    let totalResultsDevidedByPages=this.state.dataList.slice(i,i+10);
                    localTotalResultsDevidedByPages.push(totalResultsDevidedByPages);
                }
               this.setState({
                 TotalResultsDevidedByPages:localTotalResultsDevidedByPages
               })
               this.setState({
                currentPage:localTotalResultsDevidedByPages[0]
              })

              if(this.state.currentPage.length >0){
                   let tHeader = Object.keys(this.state.currentPage[0]).map(key=>{
                      
                       return key;
                   });      
                  this.setState({
                      tableHeaders:tHeader
                  })
              }
             console.log(this.state.tableHeaders);
            }              
        })
        .catch(error =>{
            console.log(error);
        })
        .then(()=>{
            console.log();
        })
    }

    changePage(pageNumber){
        console.log(pageNumber);
        this.setState({
            currentPage:this.state.TotalResultsDevidedByPages[pageNumber]
        })
        console.log(this.state.TotalResultsDevidedByPages[pageNumber]);
    }
}

export default MyView;