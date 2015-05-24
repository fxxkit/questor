<div class="cards-wrap edge2edge">
	{{#each tasks}}
	<li class="card edge2edge" taskid={{ taskId }}>
		<h3 class="task-title">{{ title }}</h3>
		<div class="task-type">{{ type }}</div>
		<div class="task-lat">{{ lat }}</div>
		<div class="task-lng">{{ lng }}</div>
		<div class="task-dist">500m</div>
	</li>
	{{/each}}
</div>
