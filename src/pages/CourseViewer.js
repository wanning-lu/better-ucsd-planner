import React from 'react'
import * as go from 'gojs'
import { ReactDiagram } from 'gojs-react'

import './App.css';  // contains .diagram-component CSS
import courseData from '../data/CSE.json'
import majorData from '../data/CS26.json'

/**
 * This is the component for the course prerequisite viewer.
 */

/**
 * Adds information to the Node object to initialize it, including its key property 
 * and text.
 * @param {Object} parent     The parent of the node to be initialized.
 * @param {Object} nodeInfo   The JSON object containing the info for the course.
 * @param {String} group      The key for the group; otherwise null.
 * @param {int} randomNumber  A random number to initialize the key of the node.
 */
function initNode(parent, nodeInfo, group, randomNumber) {
	let node = structuredClone(nodeInfo)
	node['text'] = nodeInfo['course_code']

	// set group information of the node
	if (group != null) {
		node['group'] = group;
		node['key'] = nodeInfo['course_code'] + randomNumber // bandaid solution for group duplicates
	} else {
		node['key'] = nodeInfo['course_code'] + randomNumber
	}

	// set parent information of the node
	if (parent != null) {
		node['parent'] = parent['key']
	} else {
		node['parent'] = null
	}
	
    // only expand if it's the first instance (i know, might backfire...)
	// as well as being a core requirement
	// also expands its parents, ONLY if it's < 3 deep in the tree
    if ((dataArray.filter(obj => obj.course_code === node['course_code']).length === 0) &&
            coreClasses.includes(nodeInfo['course_code'])) {
        expandCoreNodes(node, false)
	}

    // highlight if it's part of the major's courses
    if (coreClasses.includes(nodeInfo['course_code'])) {
        node['color'] = 'aquamarine'
    }

	return node;
}

/**
 * Checks if the given class is a core requirement of the major
 * @param {Object} node 
 */
function checkNodesAreCore(node) {
	if (node === null) {
		return true
	}

	if (coreClasses.includes(node['course_code'])) {
		if (node['parent'] === null) {
			return true
		}
        return checkNodesAreCore(dataArray.filter(obj => obj.key === node['parent'])[0])
    } else {
		return false
	}
}

/**
 * Expands node if it is a core class
 * @param {*} node 
 * @param {*} checked 
 */
function expandCoreNodes(node, checked) {
	// first see if all the nodes in the parent tree
	if (!checked && !checkNodesAreCore(node)) {
		return
	}

	node['expanded'] = true
	
	if (node['parent'] === null) {
		return
	}
	expandCoreNodes(dataArray.filter(obj => obj.key === node['parent'])[0], true)
}

/**
 * Builds the graph based on a root node with its prerequisites.
 * @param {Object} root         The source node for the prerequisite(s).
 * @param {String[]} prereq     The list of prerequisites for the given root node.
 * @param {String} groupName    If the node is in a group, then it is listed under this group name.
 * @param {Object[]} dataArray  The array holding all nodes.
 * @param {Object[]} linkArray  The array holding all links.
 */
function buildGraph(root, prereq, groupName, dataArray, linkArray) {
	// if there are multiple prerequisites that need to be processed
	if (prereq.length > 1) {
		// create a random group key
		let groupKey = `group${dataArray.length}`
		dataArray.push({key: groupKey, isGroup: true, text:"choose one"})
		linkArray.push({from: root.key, to: groupKey})
		prereq.forEach(function (prePrereq) {
			buildGraph(root, [prePrereq], groupKey, dataArray, linkArray)
		})
	} else if (courseData.filter(obj => obj.course_code === prereq[0]).length !== 0) { // make sure this is a valid course
		// since prereq is a string, we need to find the object associated
		// with the course code, create a deep copy
		let prereqObj = structuredClone(courseData.filter(obj => obj.course_code === prereq[0])[0])

		// CHECK: Does the link in the opposite direction already exist?
		// we do this by checking the prerequisites of the current prerequisite
		for (let i = 0; i < prereqObj.prerequisites.length; i++) {
			if (root !== null && prereqObj.prerequisites[i].includes(root['course_code'])) {
				return false;
			}
		}
		
		if (groupName != null) { // if the node belongs to a group
			let newNode = initNode(root, prereqObj, groupName, dataArray.length)
			dataArray.push(newNode)
            linkArray.push({from: groupName, to: dataArray[dataArray.length-1]['key'], defaultColor: "rgba(0, 0, 0, 0)"})
			prereqObj.prerequisites.forEach(function (prePrereq) {
				buildGraph(newNode, prePrereq, null, dataArray, linkArray)
			})
		} else {
			let newNode = initNode(root, prereqObj, null, dataArray.length)
			dataArray.push(newNode)
			linkArray.push({from: root.key, to: dataArray[dataArray.length-1]['key']})
			prereqObj.prerequisites.forEach(function (prePrereq) {
				buildGraph(newNode, prePrereq, null, dataArray, linkArray)
			})
		}
	}
}

// dataArray for the list of nodes
let dataArray = []
// linkArray for the links between nodes
// NOTE: for the sake of formatting, we want the source to be the course and
// the outgoing to be the prerequisite
let linkArray = []

// ok...another bandaid solution but i want all the first courses of
// a multi-selection core requirement to be the real "core"
let coreClasses = []

let majorData1 = majorData[0]

for (const coreClass of majorData1['core_classes']) {
	let options = coreClass.split(' or ')
	if (options.length === 1) {
		coreClasses.push(options[0])
	} else {
		// the first element is the number of "recommended" courses, which are all placed in the front
		coreClasses = coreClasses.concat(options.slice(1, 1+parseInt(options[0])))
	}
}

function removePart(diagram) {
	diagram.parts.each( function(n) {diagram.remove(n)})
}

function showNodeInfo(node, diagram) {

	diagram.parts.each( function(n) {diagram.remove(n)})
  	
	const infoWindow =
    new go.Part("Auto", {
		position: node.position.copy().offset(-70, 50)
	})
    .add(
	new go.Panel("Vertical")
	.add(
		new go.Shape("TriangleUp", {width: 20, height: 20, strokeWidth: 0, fill: "gainsboro"}),
		new go.Panel("Auto")
		.add(
			new go.Shape("RoundedRectangle", { strokeWidth: 0, fill: "gainsboro" }),
			new go.Panel("Vertical")
			.add(
				new go.TextBlock({text: `${node.data.course_name} ${node.data.key}`, margin: new go.Margin(10, 10, 0, 10), font: "Bold 16px sans-serif", width: 200}),
				new go.TextBlock({text: node.data.desc, margin: 10, width: 200})
			)
		)
	)
	);

	diagram.add(infoWindow)
}

/**
 * Diagram initialization method, which is passed to the ReactDiagram component.
 * This method is responsible for making the diagram and initializing the model and any templates.
 * The model's data should not be set here, as the ReactDiagram component handles that via the other props.
 */
function initDiagram() {
	const diagram =
	new go.Diagram(
	{
		'undoManager.isEnabled': true,  // must be set to allow for model change listening
		// 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
		click: (e, part) => {
			removePart(diagram)
		},
		model: new go.GraphLinksModel(
			{
			linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
			})
	});

	// define a simple Node template
	diagram.nodeTemplate =
	new go.Node('Auto', {
		click: (e, node) => {
			showNodeInfo(node, diagram)
		},
		isTreeExpanded: false
	})
        .bind("isTreeExpanded", "expanded")  // the Shape will go around the TextBlock
		.add(
		new go.Shape('RoundedRectangle',
			{ name: 'rectangle', fill: 'white', strokeWidth: 1})
			// Shape.fill is bound to Node.data.color
			.bind('fill', 'color'),
		
		new go.Panel('Horizontal')
			.add(
				new go.TextBlock({ margin: 8})  // some room around the text
					.bindTwoWay('text'),
				go.GraphObject.make("TreeExpanderButton")
			)
		);

	diagram.linkTemplate =
	new go.Link({ routing: go.Routing.Orthogonal, corner: 5})
        
		.add(
		new go.Shape({stroke: "black"}).bind("stroke", "defaultColor"),
		new go.Shape(   // the arrowhead
			{ fromArrow: "BackwardOpenTriangle", fill: null, stroke: "black"}).bind("stroke", "defaultColor")
		);

	diagram.groupTemplate =
	new go.Group("Auto", {
		// declare the Group.layout:
		layout: new go.LayeredDigraphLayout({
			direction: 0,
			columnSpacing: 10
		}),
	})
	.add(
		new go.Shape("RoundedRectangle", {  // surrounds everything
			parameter1: 10, fill: "rgba(128,128,128,0.33)"
		}),
		new go.Panel("Vertical",  // position header above the subgraph
			{ defaultAlignment: go.Spot.Left })
		.add(
			new go.Panel("Horizontal",  // the header
				{ defaultAlignment: go.Spot.Top })
			.add(
				// group title near top, next to button
				new go.TextBlock({ font: "12pt Sans-Serif" })
				.bind("text")
			),
			// represents area for all member parts
			new go.Placeholder({ padding: new go.Margin(10, 10), background: "white" })
		)
	);

	diagram.layout = new go.TreeLayout({arrangement: go.TreeArrangement.Horizontal});

	return diagram;
}

// render function...
function CourseViewer(props) {
	dataArray = []
	linkArray = []

	if (courseData.filter(obj => obj.course_code === props.selectedClass).length === 0) {
		dataArray.push({key: 1, text: "select a class to see its prerequisites!"})
	} else {
		let classData = courseData.filter(obj => obj.course_code === props.selectedClass)[0]
		dataArray.push(initNode(null, classData, null, 1))
		dataArray[0].expanded = true
		classData['prerequisites'].forEach(function (prereq) {
			buildGraph(dataArray[0], prereq, null, dataArray, linkArray);
		})
	}
	
	return (
		<ReactDiagram
			divClassName='diagram-component'
			initDiagram={initDiagram}
			nodeDataArray={dataArray}
			linkDataArray={linkArray}
			// onModelChange={handleModelChange}
		/>
	);
}

export default CourseViewer;