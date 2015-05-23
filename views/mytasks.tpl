<div class="cards-wrap">
	<div class="card title">{{name}}'s task</div>
	{{#each tasks}}
	<li class="card" taskid={{ taskId }}>
		<div class="task-title">{{ title }}</div>
		<div class="task-id"></div>
		<div class="task-type">{{ type }}</div>
		<div class="task-lat">{{ lat }}</div>
		<div class="task-lng">{{ lng }}</div>
	</li>
	{{/each}}
</div>
