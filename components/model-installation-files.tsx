import { WordPressFile } from '../lib/data/types'

function FileOutput({
  title,
  files
}: {
  title: string
  files: { file: WordPressFile }[] | true
}) {
  return (
    <div>
      <span>{title}: </span>
      {Array.isArray(files) ? (
        <ul>
          {files.map(({ file }) => (
            <li key={file.ID}>
              <a href={file.url} target='_blank' rel='noopener noreferrer'>
                {file.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <span>N/A</span>
      )}
    </div>
  )
}

export default function ModelInstallationFiles({
  slipStream,
  sweeperPiping,
  fullFlow,
  sideStream
}: {
  slipStream?: { file: WordPressFile }[] | true
  sweeperPiping?: { file: WordPressFile }[] | true
  fullFlow?: { file: WordPressFile }[] | true
  sideStream?: { file: WordPressFile }[] | true
}) {
  return (
    <>
      {slipStream && <FileOutput title='Slip Stream' files={slipStream} />}
      {sweeperPiping && (
        <FileOutput title='Sweeper Piping' files={sweeperPiping} />
      )}
      {fullFlow && <FileOutput title='Full Flow' files={fullFlow} />}
      {sideStream && <FileOutput title='Side Stream' files={sideStream} />}
    </>
  )
}
