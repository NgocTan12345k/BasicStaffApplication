import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";

const luongCB = 3000000;
const luongGio = 200000;

const RenderSalary = ({ salary }) => {
  return (
    <Card>
      <CardTitle className="p-3 bg-white rounded m-2">{salary.name}</CardTitle>
      <CardBody>
        <CardText>Mã nhân viên: {salary.id} </CardText>
        <CardText>Hệ số lương: {salary.salaryScale} </CardText>
        <CardText>Số giờ làm thêm: {salary.overTime} </CardText>
        <CardText className="bg-light p-2 shadow">
          Lương:{" "}
          {(salary.salaryScale * luongCB + salary.overTime * luongGio).toFixed(
            0
          )}
        </CardText>
      </CardBody>
    </Card>
  );
};

const Salary = (props) => {
  const salary = props.salary.map((item) => {
    return (
      <div className="col-12 col-md-6 col-lg-4 mt-2 mb-2" key={item.id}>
        <RenderSalary salary={item} />
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/staff">Nhân viên</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Bảng lương</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="row shadow mb-3">{salary}</div>
    </div>
  );
};

export default Salary;
