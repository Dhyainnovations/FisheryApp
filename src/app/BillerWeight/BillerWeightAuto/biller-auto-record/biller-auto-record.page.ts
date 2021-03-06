import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../weighter/./../../../shared/http.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';
import { NavController } from '@ionic/angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';

@Component({
  selector: 'app-biller-auto-record',
  templateUrl: './biller-auto-record.page.html',
  styleUrls: ['./biller-auto-record.page.scss'],
})
export class BillerAutoRecordPage implements OnInit {

  constructor(private network: Network, public navCtrl: NavController, private router: Router, private activatedRoute: ActivatedRoute, private http: HttpService, route: ActivatedRoute) {
    route.params.subscribe(val => {
      this.totalWeight()
      this.totalAmount()
      this.records();
      this.list_manual_bill();

      this.user = localStorage.getItem("Fishery-username",)
      console.log(this.user);

      window.addEventListener('offline', () => {
        this.checkoffline = true;
        this.offlineAlart = true
        this.onlineAlart = false;

      });
      window.addEventListener('online', () => {

        this.onlineAlart = true;
        this.offlineAlart = false
        this.checkonline = true;

      });
    });
  }

  ngOnInit() {

  }
  user: any = " ";
  checkoffline: any;
  checkonline: any;
  buttonDisabled: boolean;
  onlineAlart: any = true;
  offlineAlart: any = false

  totalweight: any = '';
  tableRecodrs: any = []
  cardRecords: any = []

  isVisible: any = false
  lastEntryisVisible: any = false



  dosomething(event) {
    setTimeout(() => {
      event.target.complete();

    }, 1500);
  }


  totalWeight() {
    this.http.get('/list_total_bill_weight',).subscribe((response: any) => {
      this.totalweight = response.records.total_weight;
      console.log(response);

      if (response.records.total_weight == null) {
        this.totalweight = 0;
      }


    }, (error: any) => {
      console.log(error);
    }
    );
  }

  totalCost: any;
  totalAmount() {
    this.http.get('/total_amount',).subscribe((response: any) => {
      this.totalCost = response.records.total_amount;
      console.log(response);
      if (response.records.total_amount == null) {
        this.totalCost = 0;
      }


    }, (error: any) => {
      console.log(error);
    }
    );
  }


  displayCardDetails = [];

  list_manual_bill() {
    this.http.get('/list_manual_bill',).subscribe((response: any) => {
      this.lastEntryisVisible = true
      this.displayCardDetails = response.records
      console.log(this.displayCardDetails);


    }, (error: any) => {
      console.log(error);
      this.lastEntryisVisible = false
      this.isVisible = true

    }
    );
  }

  manualBillList: any = []

  todayBillList() {
    this.http.get('/list_today_manual_bill',).subscribe((response: any) => {
      this.manualBillList = response.records;
      console.log(response);

    }, (error: any) => {
      console.log(error);
    }
    );
  }




  records() {
    this.http.get('/list_manual_weight',).subscribe((response: any) => {
      this.cardRecords = response.records;
      console.log(response);

    }, (error: any) => {
      console.log(error);
    }
    );
  }


  navigateToNextPage() {
    this.router.navigate(['/BillerAutodashboard'])
  }


  delete(id) {
    console.log(id);

    const data = {
      bilid: id,
      isDeleted: "1"
    }

    this.http.post('/delete_manual_bill', data).subscribe((response: any) => {

      console.log(response);
      if (response.success == "true") {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Deleted successfully.'
        })

        this.list_manual_bill()

      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'error',
          title: 'Something went Wrong.'
        })
      }

    }, (error: any) => {
      console.log(error);
    }
    );
  }
  logout() {
    localStorage.removeItem("orgid",)
    localStorage.removeItem("Fishery-username",)
    localStorage.removeItem("logintype",)
    localStorage.removeItem("permission",)
    this.router.navigate(['/loginpage'])
  }
}

