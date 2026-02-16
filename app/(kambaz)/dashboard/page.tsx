import Link from "next/link";
import Image from "next/image";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from "react-bootstrap";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses">
                <Row xs= {1} md={5} className="g-4">
                <Col className="wd-dashboard-course" style ={{width: "300px"}}>
                 <Card>
                    <Link href="/courses/1234/home" className="wd-dashboard-course-link text-decoration-none text-dark">
                    <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                    <CardBody>
                        <CardTitle  className="wd-dashboard-course-title text-nowrap overflow-hidden"> CS1234 React JS</CardTitle>
                        <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                            Full Stack software developer
                        </CardText>
                        <Button variant="primary"> Go </Button>
                    </CardBody>
                    </Link>
                </Card>
                </Col>


                 <Col className="wd-dashboard-course" style ={{width: "300px"}}>
                 <Card>
                    <Link href="/courses/4567/home" className="wd-dashboard-course-link text-decoration-none text-dark">
                    <CardImg variant="top" src="/images/css.png" width="100%" height={160} />
                    <CardBody>
                        <CardTitle  className="wd-dashboard-course-title text-nowrap overflow-hidden"> CS4567 CSS</CardTitle>
                        <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                             Front-end software developer
                        </CardText>
                        <Button variant="primary"> Go </Button>
                    </CardBody>
                    </Link>
                </Card>
                </Col>

                <Col className="wd-dashboard-course" style ={{width: "300px"}}>
                 <Card>
                    <Link href="/courses/8910/home" className="wd-dashboard-course-link text-decoration-none text-dark">
                    <CardImg variant="top" src="/images/js.jpg" width="100%" height={160} />
                    <CardBody>
                        <CardTitle  className="wd-dashboard-course-title text-nowrap overflow-hidden"> CS8910 JS</CardTitle>
                        <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                             Back-end software developer
                        </CardText>
                        <Button variant="primary"> Go </Button>
                    </CardBody>
                    </Link>
                </Card>
                </Col>
    
    <div className="wd-dashboard-course"> ... </div>
    </Row>
   </div>
  </div>
);}
