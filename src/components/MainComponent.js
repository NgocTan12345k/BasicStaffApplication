import React, { Component } from "react";
import Header from "./HeaderComponent";
import StaffList from "./StaffListComponent";
import StaffDetail from "./StaffDetailComponent";
import Footer from "./FooterComponent";
import DepartmentDetail from "./DepartmentdetailComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Department from "./DepartmentComponent";
import Salary from "./SalaryComponent";
import {
  addStaff,
  fetchStaffs,
  fetchStaffsSalary,
  fetchDepartments,
  deleteStaff,
  updateStaff,
} from "../redux/ActionCreators";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    staffsSalary: state.staffsSalary,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addStaff: (staff) => {
    dispatch(addStaff(staff));
  },
  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },
  fetchDepartments: () => {
    dispatch(fetchDepartments());
  },
  fetchStaffsSalary: () => {
    dispatch(fetchStaffsSalary());
  },
  deleteStaff: (id) => {
    dispatch(deleteStaff(id));
  },
  updateStaff: (staff) => {
    dispatch(updateStaff(staff));
  },
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
    this.props.fetchStaffsSalary();
  }

  render() {
    const StaffWithId = ({ match }) => {
      return (
        <StaffDetail
          staff={
            this.props.staffs.staffs.filter(
              (staff) => staff.id === parseInt(match.params.staffId, 10)
            )[0]
          }
          dept={this.props.departments.departments}
          onUpdateStaff={this.props.updateStaff}
        />
      );
    };
    const StaffWithDept = ({ match }) => {
      return (
        <DepartmentDetail
          dept={
            this.props.departments.departments.filter(
              (dept) => dept.id === match.params.deptId
            )[0]
          }
          staff={this.props.staffs.staffs.filter(
            (staff) => staff.departmentId === match.params.deptId
          )}
        />
      );
    };
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/staff/:staffId" component={StaffWithId} />
          <Route
            exact
            path="/department"
            component={() => (
              <Department
                departments={this.props.departments.departments}
                staffs={this.props.staffs.staffs}
              />
            )}
          />
          <Route exact path="/departments/:deptId" component={StaffWithDept} />
          <Route
            path="/staff"
            component={() => (
              <StaffList
                staffsLoading={this.props.staffs.isLoading}
                onAddStaff={this.props.addStaff}
                staffs={this.props.staffs.staffs}
                onDeleteStaff={this.props.deleteStaff}
              />
            )}
          />
          <Route
            path="/salary"
            component={() => (
              <Salary salary={this.props.staffsSalary.staffsSalary} />
            )}
          />
          <Redirect to="/staff" />
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
