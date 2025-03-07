import React, { useState } from 'react';

const TeacherMarkAttendance = () => {
    const [date, setDate] = useState('');
    const [timetable, setTimetable] = useState([]);
    const [selectedLecture, setSelectedLecture] = useState(null);
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({});
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bulkStatus, setBulkStatus] = useState('');
    const [showTopicInput, setShowTopicInput] = useState(false);
    const [topic, setTopic] = useState('');

    const hardcodedTimetable = {
        "2025-02-27": [
            { id: 1, name: "Lecture 1", class: "FY" },
            { id: 2, name: "Lecture 2", class: "TY" },
            { id: 3, name: "Lecture 3", class: "SY" }
        ],
    };

    const hardcodedStudents = {
        FY: [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Smith' }
        ],
        TY: [
            { id: 3, name: 'Mark Johnson' },
            { id: 4, name: 'Emily Davis' }
        ],
        SY: [
            { id: 5, name: 'Sarah Lee' },
            { id: 6, name: 'Chris Brown' }
        ]
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
        setTimetable(hardcodedTimetable[selectedDate] || []);
        setSelectedLecture(null);
        setStudents([]);
        setBulkStatus('');
    };

    const handleLectureSelect = (lecture) => {
        setSelectedLecture(lecture);
        const studentsData = hardcodedStudents[lecture.class] || [];
        setStudents(studentsData);
        setAttendance(studentsData.reduce((acc, student) => ({ ...acc, [student.id]: 'Absent' }), {}));
    };

    const handleBulkUpdate = (status) => {
        setAttendance(students.reduce((acc, student) => ({ ...acc, [student.id]: status }), {}));
        setBulkStatus(status);
    };

    const handleAttendanceChange = (studentId, status) => {
        setAttendance((prevState) => ({ ...prevState, [studentId]: status }));
    };

    const handleConfirm = () => setShowTopicInput(true);

    const calculateAttendanceCount = () => {
        let presentCount = 0, absentCount = 0;
        Object.values(attendance).forEach(status => status === 'Present' ? presentCount++ : absentCount++);
        return { presentCount, absentCount };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!date || !selectedLecture || !topic) {
            setMessage('Please complete all fields.');
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setMessage('Attendance submitted successfully');
            setShowTopicInput(false);
        }, 2000);
    };

    const { presentCount, absentCount } = calculateAttendanceCount();

    return (
        <div className="w-full mx-auto p-6 bg-transparent shadow-lg rounded-lg mt-10">
            <h2 className="text-xl font-bold text-center mb-4">Mark Attendance</h2>
            <form onSubmit={handleSubmit}>
                <input type="date" className="w-full p-2 border rounded mb-3" value={date} onChange={handleDateChange} />
                {timetable.length > 0 && (
                    <select className="w-full p-2 border rounded mb-3" onChange={(e) => handleLectureSelect(JSON.parse(e.target.value))}>
                        <option value="">Select Lecture</option>
                        {timetable.map(lecture => (
                            <option key={lecture.id} value={JSON.stringify(lecture)}>{lecture.name} ({lecture.class})</option>
                        ))}
                    </select>
                )}
                {students.length > 0 && (
                    <select className="w-full p-2 border rounded mb-3" value={bulkStatus} onChange={(e) => handleBulkUpdate(e.target.value)}>
                        <option value="">Bulk Update Attendance</option>
                        <option value="Present">Mark All Present</option>
                        <option value="Absent">Mark All Absent</option>
                    </select>
                )}
                {students.length > 0 && selectedLecture && students.map(student => (
                    <div key={student.id} className="flex justify-between items-center p-2  rounded mb-2">
                        <span>{student.name}</span>
                        <button type="button" className={`px-3 py-1 text-white rounded ${attendance[student.id] === 'Present' ? 'bg-green-500' : 'bg-red-500'}`} onClick={() => handleAttendanceChange(student.id, attendance[student.id] === 'Present' ? 'Absent' : 'Present')}>
                            {attendance[student.id] === 'Present' ? 'P' : 'A'}
                        </button>
                    </div>
                ))}
                {students.length > 0 && <button type="button" className="w-full bg-blue-500 text-white p-2 rounded mt-3" onClick={handleConfirm}>Confirm</button>}
                {showTopicInput && (
                    <>
                        <input type="text" className="w-full p-2 border rounded mt-3" placeholder="Enter topic" value={topic} onChange={(e) => setTopic(e.target.value)} required />
                        <p className="mt-2 text-sm">Present: {presentCount} | Absent: {absentCount}</p>
                        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded mt-3" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit Attendance'}</button>
                    </>
                )}
            </form>
            {message && <div className="mt-3 text-center text-blue-600">{message}</div>}
        </div>
    );
};

export default TeacherMarkAttendance;
