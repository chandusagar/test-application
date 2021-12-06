import React, { useState, useEffect } from "react";
import { Button, Row, Col, Input } from "reactstrap";
import Select from "react-select";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { prodDesc, prodOwner, prodName, postCallCreate, fetchProductWithRedux, selectedField } from "../../actions/headerProduct";

const CreateProduct = ({ productValues, prodDesc, prodOwner, prodName,  postCallCreate, selectedField, fetchProductWithRedux }) => {

  const [modalShow, setModalShow] = useState(false);

  const onSave = (e) => { 
    e.preventDefault()
    postCallCreate(productValues);
    setModalShow(false);
  };

  useEffect(() => { fetchProductWithRedux(); } , []);

  return (
    
    <div style={{ paddingLeft: "10px" }}>
      <Row>
        <Col xs={8} sm={8} md={8} lg={8}>
          <Select
            className="selectCustomizationTwo width-120"
            id="selectCustomizationTwo"
            options={productValues.selectDropDown}
            getOptionLabel={(option)=>option.prodName}
            getOptionValue={(option)=>option}
            onChange={(e) => selectedField(e)}
            value={productValues.selectDropDown[productValues.selectIndex]}
            style={{ width: "140px" }}
          />
        </Col>
        <Col xs={4} sm={4} md={4} lg={4}>
          <Button
            color="primary"
            style={{ margin: "0px 15px" }}
            className="width-120 mb-xs mr-xs"
            onClick={() => setModalShow(true)}
          >
            Create Product
          </Button>
          <div>
            <Modal
              show={modalShow}
              onHide={() => setModalShow(false)}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <form onSubmit={(e) => onSave(e)}>
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Create a new Product
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: "#f9f9f9" }}>
                  <Row>
                    <Col xs={12} sm={6} md={4} lg={4}>
                      Product Name
                    </Col>
                    <Col xs={12} sm={6} md={8} lg={8}>
                      <Input
                        type="text"
                        name="prod-name"
                        id="prod-name"
                        placeholder="Enter name"
                        value={productValues.prodName}
                        onChange={(e) => prodName(e.target.value)}
                        required
                      />
                    </Col>
                  </Row>
                  <Row style={{ padding: "10px 0" }}>
                    <Col xs={12} sm={6} md={4} lg={4}>
                      Product Description
                    </Col>
                    <Col xs={12} sm={6} md={8} lg={8}>
                      <Input
                        type="textarea"
                        name="prod-desc"
                        id="exampprod-descleText"
                        placeholder="Enter Description"
                        value={productValues.prodDescription}
                        onChange={(e) => prodDesc(e.target.value)}
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} sm={6} md={4} lg={4}>
                      Owner
                    </Col>
                    <Col xs={12} sm={6} md={8} lg={8}>
                      <Input type="text" name="prod-owner" id="prod-owner" placeholder="Enter Owner" value={productValues.prodOwner} onChange={(e) => prodOwner(e.target.value)} required />
                    </Col>
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button type="submit" color="primary"> Save </Button>
                </Modal.Footer>
              </form>
            </Modal>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    productValues: state.headerProduct,
  };
};

const mapDispatchToProps = (dispatch) => ({
  prodName: (params) => dispatch(prodName(params)),
  prodDesc: (params) => dispatch(prodDesc(params)),
  prodOwner: (params) => dispatch(prodOwner(params)),
  postCallCreate: (params) => dispatch(postCallCreate(params)),
  selectedField: (params) => dispatch(selectedField(params)),
  fetchProductWithRedux: () => dispatch(fetchProductWithRedux()),
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
