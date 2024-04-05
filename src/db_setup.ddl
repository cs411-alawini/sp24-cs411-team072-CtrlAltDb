# DDL for team072 database for CS 411 SP24

CREATE TABLE IF NOT EXISTS Professors(
    NetId                   VARCHAR(255) PRIMARY KEY,
    LastName                VARCHAR(255),
    FirstName               VARCHAR(255),
    LastNameFirstIni        VARCHAR(255),
    DepartmentCode          VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS Users(
    Email                   VARCHAR(255) PRIMARY KEY,
    Password                VARCHAR(255),
    LastName                VARCHAR(255),
    FirstName               VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS GeneralCourse(
    CourseNum               INT,
    CourseName              VARCHAR(255),
    CreditHours             VARCHAR(255),
    Description             VARCHAR(16384),
    GenEdAtrrib             VARCHAR(255),
    DepartmentCode          VARCHAR(10),
    Department              VARCHAR(255),
    PRIMARY KEY (CourseNum, DepartmentCode)
);

CREATE TABLE IF NOT EXISTS SectionAttributes(
    CourseNum               INT,
    CRN                     INT,
    Section                 VARCHAR(10),
    SectionType             VARCHAR(255),
    Professors              VARCHAR(1024),
    DepartmentCode          VARCHAR(10),
    Department              VARCHAR(255),
    Year                    INT,
    Semester                VARCHAR(16),
    FOREIGN KEY (CourseNum, DepartmentCode) REFERENCES GeneralCourse(CourseNum, DepartmentCode) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (CRN, Semester, Year)
);

CREATE TABLE IF NOT EXISTS GPAHistory(
    DepartmentCode          VARCHAR(10),
    CourseNum               INT,
    CRN                     INT,
    CourseName              VARCHAR(255),
    Sched_Type              VARCHAR(10),
    A_plus                  INT,
    A_stan                  INT,
    A_minus                 INT,
    B_plus                  INT,
    B_stan                  INT,
    B_minus                 INT,
    C_plus                  INT,
    C_stan                  INT,
    C_minus                 INT,
    D_plus                  INT,
    D_stan                  INT,
    D_minus                 INT,
    F_stan                  INT,
    Avg_Grade               DECIMAL(10,2),
    Instructor              VARCHAR(255),
    Semester                VARCHAR(16),
    Year                    INT,
    FOREIGN KEY (CourseNum, DepartmentCode) REFERENCES GeneralCourse(CourseNum, DepartmentCode) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (CRN, Semester, Year)
);

CREATE TABLE IF NOT EXISTS Teaches(
    CRN                     INT,
    Semester                VARCHAR(16),
    Year                    INT,
    NetId                   VARCHAR(255),
    FOREIGN KEY (CRN, Semester, Year) REFERENCES SectionAttributes(CRN, Semester, Year) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (NetId) REFERENCES Professors(NetId) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (CRN, Semester, Year, NetId)
);

CREATE TABLE IF NOT EXISTS UserFeedback(
    FeedbackId              VARCHAR(255) PRIMARY KEY,
    Email                   VARCHAR(255),
    Year                    INT,
    CRN                     INT,
    Semester                VARCHAR(16),
    Testimony               VARCHAR(16384),
    Rating                  DECIMAL,
    Difficulty              DECIMAL,
    TimeCommit              DECIMAL,
    Time_stamp              TIMESTAMP, 
    FOREIGN KEY (Email) REFERENCES Users(Email) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (CRN, Semester, Year) REFERENCES SectionAttributes(CRN, Semester, Year) ON DELETE CASCADE ON UPDATE CASCADE
);
