
class DatabaseConnecter {
  private $servername="localhost";
  private $username="root";
  private $password="foody";
  private $db="foody";

  private static DatabaseConnecter instance = null;
  public $connection = null;

  private function __construct(){
        $this->connection = getConnection()
  }

  public function getConnection() {

    $conn = mysqli_connect($this->servername, $this->username, $this->password, $this->db);

      // Check connection
      if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
      }
      
      if(instance == null) {
          $this->instance = new DatabaseConnecter();
      }

      $this->connection = $conn;
  }

  public function returnQuery($sql) {
    return mysqli_query($this->connection, $sql);
  }
}
