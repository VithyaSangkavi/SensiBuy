import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "../NavBar";
import "../../Ticket.css"
import Card from '@mui/material/Card';
import { CardContent } from "@mui/material";
import { borderColor, color, fontWeight } from "@mui/system";
import { blueGrey } from "@mui/material/colors";
const Details = () => {
    return(
        <div className="Container mt-3">
            <h1>Ticket id</h1>
            <Card sx={{maxWidth: 1000 ,borderColor: blueGrey, borderWidth: 2}}>
                <CardContent>
                    <div className="row">
                    <div className="left_view col-lg-6 col-md-6 col-12">
                        <img src="https://media.istockphoto.com/id/1094499134/vector/ticket-vector-isolated.jpg?s=612x612&w=0&k=20&c=qJEzYypcMRnOF6Q7tJ3BOnoW83OUZn0qkVXUdAIbsY4=" style={{width:80}} alt="logo"/>
                    <h3 className="mt-3"> Title: <span style={{fontWeight: 400}}>tTitle <span style={{fontWeight: 200}}>(tType)</span></span></h3>
                    <h4 className="mt-3"> <span style={{fontWeight: 400}}>tContent</span></h4>
                    <h6 className="mt-3"> Ticket Raised on: <span style={{fontWeight: 400}}>tType</span></h6>
                    <br/>
                </div>
                <div className="right_view col-lg-6 col-md-6 col-12" >
                <div className="add_btn">
                    <button className="btn_tick">Edit Ticket</button>
                    <button className="btn_tick">Delete Ticket</button>

                </div>    
                    <h4 className="mt-3"> Reply: <span>tReply</span> </h4>
                    <h6 className="mt-3"> Replied on: <span style={{fontWeight: 400}}>tReplyDate</span></h6>
                    <br/><br/>
                    <h4>Ticket Status : <span2>STATUS</span2></h4>
                </div>

                    </div>
                    

                </CardContent>
            </Card>


        </div>
    )
}
export default Details;