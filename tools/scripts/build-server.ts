import { exec } from 'child_process';
import { argv, exit } from 'process';
//@ts-ignore
import minimist from 'minimist';

const args = minimist(argv.slice(2), {
  string: ['projectDirectory', 'containerName']
});

if (!args.projectDirectory || !args.containerName) {
  console.error('Project directory and container name must be specified');
  console.log('');
  console.log('usage:');
  console.log(
    'npm run build:server --projectDirectory=path/to/server --containerName=test-container'
  );
  exit(1);
}

exec(
  `docker build -t ${args.containerName} -f docker/api.Dockerfile --build-arg PROJECT_DIRECTORY=${args.projectDirectory} .`,
  (error, stdout, sdterr) => {
    if (error) {
      console.error(error);
      exit(1);
    }
    if (sdterr) {
      console.log(error);
    }

    console.log(stdout);
  }
);
