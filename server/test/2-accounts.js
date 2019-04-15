import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { login } from '../data/users.json';
import { accounts, accountValidation, accountValidation1 } from '../data/accounts.json';

chai.use(chaiHttp);
chai.should();
let token;
let accountNumber;
describe('Account',()=>{
    before('let user login',(done)=>{
     chai.request(app)
        .post('/api/v1/signin')
        .set('Content-Type','application/json')
        .send(login)
        .end((err,res)=>{
         if(err){
            console.log(err);
         }
         token=`Bearer ${res.body.token}`;
         done();
    })
});
// should create account
it('should let user to create account and return status of 201',(done)=>{
 chai.request(app)
  .post('/api/v1/accounts')
  .set('Content-Type','application/json')
  .set('Authorization',token)
  .send(accounts)
  .end((error,res)=>{
    if(error){
    done(error);
    }
    accountNumber=res.body.data.accountNumber;
    res.should.have.status(201);
    res.body.should.have.property('status');
    res.body.should.have.property('message');
    res.body.should.have.property('data');
    done();
  })
});
//400 validation
it('should let user to create account and return status of 201',(done)=>{
    chai.request(app)
     .post('/api/v1/accounts')
     .set('Content-Type','application/json')
     .set('Authorization',token)
     .send({type:"",balance:45})
     .end((error,res)=>{
       if(error){
       done(error);
       }
       res.should.have.status(400);
       res.body.should.have.property('message');
       done();
     })
   });
// should create account
it('should return status of 401',(done)=>{
    chai.request(app)
     .post('/api/v1/accounts')
     .set('Content-Type','application/json')
     .end((error,res)=>{
       if(error){
       done(error);
       }
       res.should.have.status(401);
       done();
     })
   });
//status of 400
it('should return status of 400 when creating account',(done)=>{
    chai.request(app)
     .post('/api/v1/accounts')
     .set('Content-Type','application/json')
     .set('Authorization',token)
     .send(accountValidation)
     .end((error,res)=>{
       if(error){
       done(error);
       }
       res.should.have.status(400);
       res.body.should.have.property('message');
       done();
     })
   });
// should create account
it('should return status of 400 when there is validation error',(done)=>{
    chai.request(app)
     .post('/api/v1/accounts')
     .set('Content-Type','application/json')
     .set('Authorization',token)
     .end((error,res)=>{
       if(error){
       done(error);
       }
       res.should.have.status(400);
       res.body.should.have.property('message');
       done();
     })
   });
    it(`should return status 0f 200 when getting all accounts`,(done)=>{
    chai.request(app)
    .get('/api/v1/accounts')
    .set('Content-Type','application/json')
    .set('Authorization',token)
    .end((error,res)=>{
        if(error){
        done(error);
        }
        res.should.have.status(200);
        done();
    })
    });
   it(`should return status 0f 200 when getting one account`,(done)=>{
        chai.request(app)
        .get(`/api/v1/accounts/${accountNumber}`)
        .set('Content-Type','application/json')
        .set('Authorization',token)
        .end((error,res)=>{
            if(error){
            done(error);
            }
            res.should.have.status(200);
            res.body.should.have.property('status');
            res.body.should.have.property('account');
            done();
        })
    });
    it(`should return status 0f 404 when account not found`,(done)=>{
        chai.request(app)
        .get(`/api/v1/accounts/56579657965769576`)
        .set('Content-Type','application/json')
        .set('Authorization',token)
        .end((error,res)=>{
            if(error){
            done(error);
            }
            res.should.have.status(404);
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            done();
        })
    });
    //update
    it(`should return status 0f 200 when updating account`,(done)=>{
        chai.request(app)
        .patch(`/api/v1/accounts/${accountNumber}`)
        .set('Content-Type','application/json')
        .set('Authorization',token)
        .end((error,res)=>{
            if(error){
            done(error);
            }
            res.should.have.status(200);
            res.body.should.have.property('message');
            res.body.should.have.property('updateAccount');
            done();
        })
    });
    //
    it(`should return status 0f 404 when updating an account fails`,(done)=>{
        chai.request(app)
        .patch(`/api/v1/accounts/548674`)
        .set('Content-Type','application/json')
        .set('Authorization',token)
        .end((error,res)=>{
            if(error){
            done(error);
            }
            res.should.have.status(404);
            res.body.should.have.property('message');
            done();
        })
    });
    //
    it(`should return status 0f 200 when deleting an account`,(done)=>{
        chai.request(app)
        .delete(`/api/v1/accounts/${accountNumber}`)
        .set('Content-Type','application/json')
        .set('Authorization',token)
        .end((error,res)=>{
            if(error){
            done(error);
            }
            res.should.have.status(200);
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            res.body.should.have.property('data');
            done();
        })
    });
    it(`should return status 0f 400 when delete account fails`,(done)=>{
        chai.request(app)
        .delete(`/api/v1/accounts/4674674`)
        .set('Content-Type','application/json')
        .set('Authorization',token)
        .end((error,res)=>{
            if(error){
            done(error);
            }
            res.should.have.status(404);
            res.body.should.have.property('message');
            done();
        })
    });
})