import React from "react";
import "./about.css";

export default function About() {
  return (
    <div className="about">
      <h1>To-Do List Application Overview</h1>
      <p>
        The To-Do List application is a React-based tool that helps users
        efficiently manage their tasks. Here are the main features:
      </p>
      <h2>Main Features</h2>
      <ul>
        <li>
          <strong>Task Management:</strong> Users can add, view, and delete
          tasks stored in an Airtable database.
        </li>
        <li>
          <strong>Search Functionality:</strong> Quickly filter tasks using a
          search bar, with feedback if no results are found.
        </li>
        <li>
          <strong>Dynamic Sorting:</strong> Toggle between ascending and
          descending order for task organization.
        </li>
        <li>
          <strong>Pagination:</strong> Display a set number of tasks per page
          (default is 5) for easier navigation.
        </li>
        <li>
          <strong>Data Persistence:</strong> Tasks are saved in Airtable,
          ensuring they remain after page refreshes.
        </li>
        <li>
          <strong>Loading States:</strong> Visual feedback is provided during
          data fetching.
        </li>
        <li>
          <strong>Error Handling:</strong> Users are notified of any issues when
          adding or deleting tasks.
        </li>
        <li>
          <strong>User-Friendly Interface:</strong> A clean, intuitive design
          enhances the overall experience.
        </li>
      </ul>
      <h2>Technical Details</h2>
      <ul>
        <li>
          <strong>State Management:</strong> Utilizes React's{" "}
          <code>useState</code> for managing task states and{" "}
          <code>useEffect</code> for data fetching.
        </li>
        <li>
          <strong>Performance Optimization:</strong> Employs{" "}
          <code>useMemo</code> to optimize filtered and sorted task lists.
        </li>
        <li>
          <strong>API Integration:</strong> Communicates with the Airtable API
          for CRUD operations on tasks.
        </li>
      </ul>
    </div>
  );
}
