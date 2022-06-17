import React from "react";

function StaffList(props) {
    const ListNhanvien = props.staffs.map(nv => {
        return <div key={nv.id}>
            <div className="col-12 col-md-2 m-1" >
                <img src={nv.image} alt={nv.name} />
                <p>{nv.name}</p>
            </div>
        </div>
    })
    return (
        <div className="container">
            <div className="row">{ListNhanvien}</div>
        </div>
    );
}

export default StaffList;
